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
import { QuizSession } from "@/models/Response";
import {
  fetchProfileUidFromLocalStorage,
  storeProfileUidInLocalStorage,
  createNewProfileOnServer,
  updateProfileOnServer,
  updateProfileAvatarOnServer,
  fetchLocalProfile,
} from "@/lib/profileUtils";
import {
  createQuizSessionOnServer,
  recordUserResponseOnServer,
} from "@/lib/quizUtils";

interface UserSessionProviderProps {
  isLoading: boolean;
  localProfile: ProfileLocal | null;
  quizSession: QuizSession | null;
  createNewProfile: (profileToCreate: Profile) => void;
  updateProfile: (profileToUpdate: Partial<Profile>) => Promise<boolean>;
  updateAvatar(url: string): Promise<boolean>;
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
  }) => Promise<{ correct: boolean; detail: string } | null>;
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

  /**
   * Create a new profile on the server and set the local profile.
   * @param profileToCreate
   */
  async function createNewProfile(profileToCreate: Profile) {
    // Step 1: Create the profile on the server
    setIsLoading(true);
    const result = await createNewProfileOnServer(profileToCreate);
    // Step 2: If the profile is created successfully, set the local profile
    if (result != null) {
      await storeProfileUidInLocalStorage(profileToCreate.uid);
      setLocalProfile(result);
      // Step 3: Create a new quiz session
      await createNewQuizSession({
        newUserUid: profileToCreate.uid,
        isPreload: false,
        forceNewSession: true,
      });
    }
  }

  /**
   * Update the user profile on the server and set the local profile.
   * @param profileToUpdate
   * @returns
   */
  async function updateProfile(
    profileToUpdate: Partial<Profile>
  ): Promise<boolean> {
    setIsLoading(true);
    if (localProfile == null) {
      setIsLoading(false);
      return false;
    }
    const result = await updateProfileOnServer({
      uid: localProfile.uid,
      profile: {
        ...localProfile,
        ...profileToUpdate,
      },
    });
    if (result != null) {
      setLocalProfile(result);
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      return false;
    }
  }

  /**
   * Update the user avatar image URL.
   * @param url
   */
  async function updateAvatar(url: string): Promise<boolean> {
    setIsLoading(true);
    if (localProfile == null) {
      setIsLoading(false);
      return false;
    }
    const result = await updateProfileAvatarOnServer({
      uid: localProfile.uid,
      avatarImageUrl: url,
    });
    if (result !== null && result === true) {
      setLocalProfile({
        ...localProfile,
        avatarImageUrl: url,
      });
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      return false;
    }
  }

  /**
   * Start a new quiz session.
   * @param param0
   * @returns
   */
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
    if (quizSession != null && forceNewSession === false) {
      setIsLoading(false);
      router.push("/quiz");
      return;
    }
    const localUid =
      newUserUid ||
      localProfile?.uid ||
      (await fetchProfileUidFromLocalStorage());
    // Make sure user profile & localUid is available
    if (localProfile == null || localUid == null) {
      setIsLoading(false);
      return;
    }
    const userLocale = params.locale as string;
    // Create a new quiz session from the server
    const quizSessionResult = await createQuizSessionOnServer(
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

  /**
   * Record an answer to a quiz question.
   * @param param0
   * @returns
   */
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
  }): Promise<{
    correct: boolean;
    detail: string;
  } | null> {
    if (localProfile == null) {
      return null;
    }
    if (quizSession == null) {
      return null;
    }

    const localUid =
      localProfile.uid || (await fetchProfileUidFromLocalStorage());
    if (localUid == null) {
      return null;
    }

    const answerResult = recordUserResponseOnServer({
      userUid: localUid,
      articleUid,
      userRespondedIsHuman: humanOptionSelected,
      userRespondedIsFake: isFakeSelected,
      timeToRespond,
      localeRespondedIn: params.locale as string,
      articleIndex: quizSession.currentArticleIndex,
    });

    if (answerResult == null) {
      return null;
    }

    return answerResult;
  }

  /**
   * After recording a response, increment the current article index.
   * @returns
   */
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

  /**
   * End the quiz session and navigate to the profile.
   */
  async function endQuizSession() {
    setQuizSession(null);
    router.push("/profile");
  }

  const value: UserSessionProviderProps = {
    isLoading,
    localProfile,
    quizSession,
    createNewProfile,
    updateProfile,
    updateAvatar,
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
