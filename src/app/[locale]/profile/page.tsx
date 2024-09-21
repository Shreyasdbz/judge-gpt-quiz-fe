"use client";

import { useUserSession } from "@/providers/UserSessionProvider";
import Footer from "@/components/blocks/Footer";
import SiteLogoText from "@/components/typography/SiteLogoText";
import ProfileUpdateDialog from "./components/ProfileUpdateDialog";
import UserStatistics from "./components/UserStatistics";
import AvatarUpdateDialog from "./components/AvatarUpdateDialog";

const ProfilePage = () => {
  const { localProfile } = useUserSession();

  if (!localProfile) {
    return (
      <div>
        <h1>No profile to display here</h1>
        <h3>Go to the home page to create a profile</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 py-4 lg:px-8">
      <div className="w-full max-w-6xl">
        <SiteLogoText variant="small" includeSecondaryText />
      </div>
      {/* Avatar and Edit */}
      <div className="flex flex-col items-center justify-center w-full h-full max-w-6xl py-8 lg:items-start">
        <div>
          <AvatarUpdateDialog />
        </div>
        {localProfile && (
          <p className="flex items-center justify-center gap-1 py-4">
            <span className="text-lg font-light">Hello</span>
            <span className="text-xl font-medium">{localProfile.username}</span>
          </p>
        )}
        <div className="flex flex-col items-center justify-start max-w-6xl gap-2">
          <ProfileUpdateDialog />
        </div>
      </div>
      {/* Stats & Achievements */}
      <div className="flex flex-col items-center justify-center w-full max-w-6xl">
        {/* Your stats */}
        <div className="flex flex-col items-center justify-center w-full">
          <span className="w-full py-2 text-lg font-semibold text-left">
            Your statistics
          </span>
          <UserStatistics />
        </div>
        {/* Your achievements */}
        <div className="flex flex-col items-center justify-center w-full max-w-6xl py-4">
          <span className="w-full text-lg font-semibold text-left">
            Your achievements
          </span>
          <div className="flex flex-row items-center justify-start w-full gap-4 overflow-y-scroll"></div>
        </div>
      </div>
      <Footer variant="bottom" />
    </div>
  );
};

export default ProfilePage;
