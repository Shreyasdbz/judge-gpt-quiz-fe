"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { Profile, ProfileLocal } from "@/models/Profile";
import { QuizSession } from "@/models/QuizSession";
import {
  fetchProfileUidFromLocalStorage,
  storeProfileUidInLocalStorage,
  createNewProfileOnServer,
  fetchLocalProfile,
} from "@/lib/profileUtils";
import {
  createQuizSessionFromServer,
  recordUserResponseOnServer,
} from "@/lib/quizUtils";

interface UserSessionProviderProps {
  isLoading: boolean;
  localProfile: ProfileLocal | null;
  quizSession: QuizSession | null;
  createNewProfile: (profileToCreate: Profile) => void;
  createNewQuizSession: ({
    newUserUid,
    isPreload,
    forceNewSession,
  }: {
    newUserUid?: string;
    isPreload?: boolean;
    forceNewSession?: boolean;
  }) => void;
  recordUserResponse: ({
    articleUid,
    humanOptionSelected,
    isFakeSelected,
    timeToRespond,
  }: {
    articleUid: string;
    humanOptionSelected: boolean;
    isFakeSelected: boolean;
    timeToRespond: number;
  }) => Promise<boolean | null>;
  incrementCurrentArticleIndex: () => void;
}

const UserSessionContext = createContext<UserSessionProviderProps | null>(null);

export const UserSessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const params = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [localProfile, setLocalProfile] = useState<ProfileLocal | null>(null);
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null);

  async function createNewProfile(profileToCreate: Profile) {
    // Step 1: Create the profile on the server
    setIsLoading(true);
    const result = await createNewProfileOnServer(profileToCreate);
    // Step 2: If the profile is created successfully, set the local profile
    await storeProfileUidInLocalStorage(profileToCreate.uid);
    if (result != null) {
      setLocalProfile(result);
      // Step 3: Create a new quiz session
      await createNewQuizSession({
        newUserUid: profileToCreate.uid,
        isPreload: false,
        forceNewSession: true,
      });
    }
  }

  async function createNewQuizSession({
    newUserUid,
    isPreload = false,
    forceNewSession = false,
  }: {
    newUserUid?: string;
    isPreload?: boolean;
    forceNewSession?: boolean;
  }) {
    setIsLoading(true);
    // Make sure quizSession is not already set
    if (quizSession != null && !forceNewSession) {
      setIsLoading(false);
      router.push("/quiz");
      return;
    }
    const localUid = (await fetchProfileUidFromLocalStorage()) || newUserUid;
    // Make sure user profile & localUid is available
    if (localProfile == null || localUid == null) {
      setIsLoading(false);
      return;
    }
    const userLocale = params.locale as string;
    // Create a new quiz session from the server
    const quizSessionResult = await createQuizSessionFromServer(
      localUid,
      userLocale
    );
    if (quizSessionResult === null) {
      setIsLoading(false);
      return;
    } else {
      setQuizSession(quizSessionResult);
      setIsLoading(false);
      if (!isPreload) {
        router.push("/quiz");
      }
    }
  }

  async function recordUserResponse({
    articleUid,
    humanOptionSelected,
    isFakeSelected,
    timeToRespond,
  }: {
    articleUid: string;
    humanOptionSelected: boolean;
    isFakeSelected: boolean;
    timeToRespond: number;
  }): Promise<boolean | null> {
    if (localProfile == null) {
      return null;
    }
    if (quizSession == null) {
      return null;
    }

    const localUid = await fetchProfileUidFromLocalStorage();
    if (localUid == null) {
      return null;
    }

    const answerResult = recordUserResponseOnServer({
      userUid: localUid,
      articleUid: articleUid,
      userRespondedIsHuman: humanOptionSelected,
      userRespondedIsFake: isFakeSelected,
      timeToRespond: timeToRespond,
    });

    if (answerResult == null) {
      return null;
    }

    return answerResult;
  }

  async function incrementCurrentArticleIndex() {
    if (quizSession == null) {
      return;
    }
    if (quizSession.currentArticleIndex + 1 < quizSession.articles.length) {
      quizSession.currentArticleIndex += 1;
    } else if (
      quizSession.currentArticleIndex + 1 >=
      quizSession.articles.length
    ) {
      endQuizSession();
    }
  }

  async function endQuizSession() {
    setQuizSession(null);
    router.push("/scores");
  }

  const value: UserSessionProviderProps = {
    isLoading,
    localProfile,
    quizSession,
    createNewProfile,
    createNewQuizSession,
    recordUserResponse,
    incrementCurrentArticleIndex,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      const profile = await fetchLocalProfile();
      if (profile != null) {
        setLocalProfile(profile);
        // TODO: Preload the quiz session if the user has a profile
      }
      setIsLoading(false);
    };
    fetchProfile();
  }, []);

  return (
    <UserSessionContext.Provider value={value}>
      {children}
    </UserSessionContext.Provider>
  );
};

export const useUserSession = () => {
  const context = useContext(UserSessionContext);
  if (!context) {
    throw new Error(
      "useUserSessionProvider must be used within a UserSessionProvider"
    );
  }
  return context;
};
