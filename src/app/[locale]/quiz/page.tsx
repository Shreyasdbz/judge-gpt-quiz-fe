"use client";
import { useUserSession } from "@/providers/UserSessionProvider";
import Footer from "@/components/blocks/Footer";
import SiteLogoText from "@/components/typography/SiteLogoText";
import QuizSessionContainer from "./components/QuizSessionContainer";

const QuizPage = () => {
  const { isLoading, quizSession } = useUserSession();

  if (isLoading === false && quizSession === null) {
    // TODO: Implement a nice error page and redirect button
    return null;
  }

  if (quizSession === null) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start w-full gap-2 px-4 py-2 h-dvh md:px-8">
      <div className="w-full max-w-6xl px-2 lg:px-10">
        <SiteLogoText variant={"small"} includeSecondaryText={true} />
      </div>
      <div className="w-full h-full max-w-6xl px-2 lg:px-10">
        <QuizSessionContainer />
      </div>
      <div className="w-full max-w-6xl px-2 lg:px-10">
        <Footer variant="bottom" />
      </div>
    </div>
  );
};

export default QuizPage;
