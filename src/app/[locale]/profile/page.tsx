"use client";

import { useUserSession } from "@/providers/UserSessionProvider";
import Footer from "@/components/blocks/Footer";
import SiteLogoText from "@/components/typography/SiteLogoText";
import ProfileUpdateDialog from "./components/ProfileUpdateDialog";
import UserStatistics from "./components/UserStatistics";

const ProfilePage = () => {
  const { localProfile } = useUserSession();

  return (
    <div className="w-full h-full flex items-center justify-center flex-col px-4 lg:px-8 py-4">
      <div className="w-full max-w-6xl">
        <SiteLogoText variant="small" includeSecondaryText />
      </div>
      {/* Avatar and Edit */}
      <div className="w-full h-full max-w-6xl flex flex-col items-center lg:items-start justify-center py-4">
        {localProfile && (
          <p className="flex items-center justify-center gap-1 py-4">
            <span className="font-light text-lg">Hello</span>
            <span className="font-medium text-xl">{localProfile.username}</span>
          </p>
        )}
        <div className="items-center justify-start flex flex-col gap-2 max-w-6xl">
          <ProfileUpdateDialog />
        </div>
      </div>
      {/* Stats & Achievements */}
      <div className="w-full flex flex-col items-center justify-center max-w-6xl">
        {/* Your stats */}
        <div className="w-full items-center justify-center flex flex-col">
          <span className="w-full text-left text-lg font-semibold py-2">
            Your statistics
          </span>
          <UserStatistics />
        </div>
        {/* Your achievements */}
        <div className="w-full items-center justify-center flex flex-col py-4 max-w-6xl">
          <span className="w-full text-left text-lg font-semibold">
            Your achievements
          </span>
          <div className="w-full flex flex-row items-center justify-start gap-4 overflow-y-scroll"></div>
        </div>
      </div>
      <Footer variant="bottom" />
    </div>
  );
};

export default ProfilePage;
