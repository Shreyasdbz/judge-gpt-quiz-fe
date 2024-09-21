"use client";

import { useState, useEffect } from "react";
import { ProfileStatistics } from "@/models/Profile";
import { getUserStatusFromServer } from "@/lib/profileUtils";
import { useUserSession } from "@/providers/UserSessionProvider";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

const UserStatistics = () => {
  const { localProfile } = useUserSession();
  const [userStatistics, setUserStatistics] =
    useState<ProfileStatistics | null>(null);

  useEffect(() => {
    // Fetch
    if (localProfile !== null) {
      getUserStatusFromServer({ uid: localProfile.uid }).then((data) => {
        setUserStatistics(data);
      });
    }
  }, [localProfile]);

  const StatCard = ({
    headerText,
    captionText,
  }: {
    headerText: string;
    captionText: string;
  }) => {
    return (
      <Card className="mb-4">
        <CardHeader>
          <span className="w-full whitespace-nowrap text-xl font-medium">
            {headerText}
          </span>
        </CardHeader>
        <CardFooter>
          <span className="w-full whitespace-nowrap text-sm text-muted-foreground">
            {captionText}
          </span>
        </CardFooter>
      </Card>
    );
  };

  if (userStatistics === null) {
    return (
      <div className="w-full flex items-center justify-center flex-col">
        <span className="w-full text-left text text-muted-foreground font-light">
          No statistics to show just yet
        </span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-row items-center justify-start gap-4 overflow-y-scroll pr-4">
      {/* Cast to string */}
      <StatCard
        captionText="Total score"
        headerText={userStatistics.totalScore.toString()}
      />
      <StatCard
        captionText="# of articles read"
        headerText={userStatistics.totalQuestionsAnswered.toString()}
      />
      <StatCard
        captionText="% guessed correctly"
        headerText={userStatistics.percentCorrect.toString()}
      />
      <StatCard
        captionText="Average time to guess"
        headerText={`${userStatistics.averageTimeToRespond.toString()}s`}
      />
    </div>
  );
};

export default UserStatistics;
