import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useUserSession } from "@/providers/UserSessionProvider";
import { decodeHTMLEntities } from "@/lib/utils";
import QuizView from "./QuizView";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowRight, ChartSpline, CheckCheck, HeartCrack } from "lucide-react";

const QuizSessionContainer = () => {
  const { quizSession, recordUserResponse, incrementCurrentArticleIndex } =
    useUserSession();
  const quizTranslations = useTranslations("Quiz");
  const [userResult, setUserResult] = useState<boolean | null>(null);
  const [humanAiOptionChecked, setHumanAiOptionChecked] = useState<
    "human" | "ai" | null
  >(null);
  const [realFakeOptionChecked, setRealFakeOptionChecked] = useState<
    "real" | "fake" | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [timeElapsedForQuestion, setTimeElapsedForQuestion] = useState<
    number | null
  >(null);

  async function onSubmit({
    humanOptionSelected,
    isFakeSelected,
  }: {
    humanOptionSelected: boolean;
    isFakeSelected: boolean;
  }): Promise<void> {
    if (quizSession === null) {
      return;
    }
    const timeElapsed = Date.now() - timeElapsedForQuestion!;
    setTimeElapsedForQuestion(null);
    setIsSubmitting(true);
    const response = await recordUserResponse({
      articleUid: quizSession.articles[quizSession.currentArticleIndex].uid,
      humanOptionSelected,
      isFakeSelected,
      timeToRespond: timeElapsed,
    });
    if (response === null) {
      return;
    }
    setIsSubmitting(false);
    setUserResult(response);
  }

  async function onUserResultClose() {
    setUserResult(null);
    incrementCurrentArticleIndex();
    // Reset input states
    setHumanAiOptionChecked(null);
    setRealFakeOptionChecked(null);
    setTimeElapsedForQuestion(Date.now());
  }

  // Picks from a list of random feedback messages
  function getRandomFeedback(forIsCorrect: boolean): string {
    // Random number between 1 and 30
    const randomNum = Math.floor(Math.random() * 30) + 1;
    const feedbackToPick = `${
      forIsCorrect ? "correct" : "incorrect"
    }_comment_${randomNum}`;
    return decodeHTMLEntities(quizTranslations(feedbackToPick));
  }

  // Start timeElapsed counter for 1st question
  useEffect(() => {
    if (quizSession !== null && quizSession.currentArticleIndex === 0) {
      setTimeElapsedForQuestion(Date.now());
    }
  }, [quizSession]);

  if (quizSession === null) {
    return null;
  }

  if (quizSession.articles.length === 0) {
    return (
      <div className="w-full h-full items-center justify-center flex">
        <div className="w-full flex items-center justify-center">
          <h1>TODO: No articles found. Implement this</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full items-center justify-center flex">
      <QuizView
        quizSession={quizSession}
        onSubmitCallback={onSubmit}
        humanAiOptionChecked={humanAiOptionChecked}
        setHumanAiOptionChecked={setHumanAiOptionChecked}
        realFakeOptionChecked={realFakeOptionChecked}
        setRealFakeOptionChecked={setRealFakeOptionChecked}
      />
      {/* Loading / checking answer dialog */}
      <AlertDialog open={isSubmitting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {quizTranslations("quizViewSubmitProcessing")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {quizTranslations("quizViewSubmitProcessingSubtitle")}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      {/* Answer result dialog */}
      <AlertDialog open={userResult !== null}>
        <AlertDialogContent onEscapeKeyDown={onUserResultClose}>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex w-full items-center justify-center">
              {userResult === null
                ? quizTranslations("quizViewSubmitProcessing")
                : getRandomFeedback(userResult)}
            </AlertDialogTitle>
            <AlertDialogDescription className="w-full justify-center flex items-center">
              {userResult === null && (
                <span>
                  {quizTranslations("quizViewSubmitProcessingSubtitle")}
                </span>
              )}
              {userResult === true && (
                <CheckCheck
                  className="text-green-500 dark:text-green-500"
                  size={24}
                />
              )}
              {userResult === false && (
                <HeartCrack
                  className="text-red-500 dark:text-red-500"
                  size={24}
                />
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="w-full flex items-center justify-center"
              onClick={() => {
                onUserResultClose();
              }}
            >
              {quizSession.currentArticleIndex + 1 <
              quizSession.articles.length ? (
                <span className="w-full flex items-center justify-center gap-2">
                  {quizTranslations("quizViewSubmitNextButton")}
                  <ArrowRight size={18} />
                </span>
              ) : (
                <span className="w-full flex items-center justify-center gap-2">
                  {quizTranslations("quizViewSubmitViewScoresButton")}
                  <ChartSpline size={18} />
                </span>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuizSessionContainer;
