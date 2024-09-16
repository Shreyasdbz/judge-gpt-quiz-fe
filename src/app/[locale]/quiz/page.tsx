"use client";
import { useUserSession } from "@/providers/UserSessionProvider";
// import { useRouter } from "@/i18n/routing";
import Footer from "@/components/blocks/Footer";
import SiteLogoText from "@/components/typography/SiteLogoText";
import QuizSessionContainer from "./components/QuizSessionContainer";
import { Link } from "@/i18n/routing";

const QuizPage = () => {
  // const router = useRouter();
  const { isLoading, quizSession } = useUserSession();

  if (isLoading === false && quizSession === null) {
    // TODO: Implement a nice error page and redirect button
    // router.push("/");
    return null;
  }

  if (quizSession === null) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-start h-dvh py-2 px-4 md:px-8 gap-2">
      <div className="w-full max-w-6xl px-2 lg:px-10">
        <Link href={"/"}>
          <SiteLogoText variant={"small"} includeSecondaryText={true} />
        </Link>
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
