"use client";

import { useTranslations } from "next-intl";
import SiteLogoText from "@/components/typography/SiteLogoText";
import ProfileSetupDialog from "./components/ProfileSetupDialog";
import Footer from "@/components/blocks/Footer";
import TopScoresButton from "./components/TopScoresButton.client";
import { useUserSession } from "@/providers/UserSessionProvider";
import NewQuizTrigger from "./components/NewQuizTrigger";
import ProfileButton from "./components/ProfileButton";

const HomePage = () => {
  const { localProfile } = useUserSession();
  const t = useTranslations("HomePage");

  return (
    <div className="w-full h-dvh overflow-clip flex flex-col items-center justify-start px-4 py-1 gap-6 bg-background">
      <main className="w-full h-full flex flex-col items-center justify-start lg:flex-row lg:justify-center max-w-6xl">
        {/* Left content */}
        <div className="flex flex-col items-center justify-start w-full gap-6 h-full lg:justify-center lg:px-10">
          <div className="w-full flex items-center justify-start flex-col gap-2">
            <SiteLogoText variant={"large"} />
            <span className="w-full text-left font-semibold text-lg text-primary lg:text-center">
              {t("subtitle")}
            </span>
            <span className="text-sm  w-full text-left text-muted-foreground lg:text-center">
              {t("description")}
            </span>
          </div>
          {/* CTA Buttons */}
          <div className="w-full flex flex-col items-center justify-center gap-2">
            {localProfile ? <NewQuizTrigger /> : <ProfileSetupDialog />}
            <TopScoresButton />
            {localProfile && <ProfileButton />}
          </div>
        </div>
        {/* Right Content */}
        <div className="h-full w-full flex items-center justify-center">
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/sapiens.svg"
            alt="Hero"
            className="h-32 sm:h-56 md:h-72 lg:h-96 w-auto aspect-square"
          />
        </div>
      </main>
      <Footer variant="both" />
    </div>
  );
};

export default HomePage;
