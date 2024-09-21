"use client";

import { useUserSession } from "@/providers/UserSessionProvider";
import Footer from "@/components/blocks/Footer";
import SiteLogoText from "@/components/typography/SiteLogoText";
import ProfileUpdateDialog from "./components/ProfileUpdateDialog";
import UserStatistics from "./components/UserStatistics";

const ProfilePage = () => {
  const { localProfile } = useUserSession();

  return (
    <div className="w-full h-full flex items-center justify-center flex-col px-2 py-4">
      <div className="w-full max-w-6xl">
        <SiteLogoText variant="small" includeSecondaryText />
      </div>
      <div className="w-full h-full max-w-6xl flex flex-col items-center justify-center py-4">
        {/* Avatar and Edit */}
        {localProfile && (
          <p className="w-full flex items-center justify-center gap-1 py-4">
            <span className="font-light">Hello</span>
            <span className="font-medium">{localProfile.username}</span>
          </p>
        )}
        <div className="w-full items-center justify-center flex flex-col gap-2">
          <ProfileUpdateDialog />
        </div>
        {/* Your stats */}
        <div className="w-full items-center justify-center flex flex-col py-4">
          <span className="w-full text-left text-lg font-semibold py-2">
            Your statistics
          </span>
          <UserStatistics />
        </div>
        {/* Your achievements */}
        <div className="w-full items-center justify-center flex flex-col py-4">
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
