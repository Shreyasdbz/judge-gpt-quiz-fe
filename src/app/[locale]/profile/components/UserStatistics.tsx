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
          <span className="w-full text-xl font-medium whitespace-nowrap">
            {headerText}
          </span>
        </CardHeader>
        <CardFooter>
          <span className="w-full text-sm whitespace-nowrap text-muted-foreground">
            {captionText}
          </span>
        </CardFooter>
      </Card>
    );
  };

  if (userStatistics === null) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <span className="w-full font-light text-left text text-muted-foreground">
          No statistics to show just yet
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-start w-full gap-4 pr-4 overflow-y-scroll">
      {/* Cast to string */}
      <StatCard
        captionText="Total score"
        headerText={userStatistics.totalScore.toFixed(0)}
      />
      <StatCard
        captionText="Articles read"
        headerText={userStatistics.totalQuestionsAnswered.toFixed(0)}
      />
      <StatCard
        captionText="Guessed correctly"
        headerText={`${userStatistics.percentCorrect.toFixed(2)}%`}
      />
      <StatCard
        captionText="Average time to guess"
        headerText={`${userStatistics.averageTimeToRespond.toFixed(2)}s`}
      />
      <StatCard
        captionText="Responded human authored"
        headerText={`${userStatistics.percentRespondedIsHuman.toFixed(2)}%`}
      />
      <StatCard
        captionText="Responded is fake"
        headerText={`${userStatistics.percentRespondedIsFake.toFixed(2)}%`}
      />
    </div>
  );
};

export default UserStatistics;
