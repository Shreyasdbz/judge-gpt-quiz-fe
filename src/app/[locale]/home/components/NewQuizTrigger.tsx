"use client";

import { Button } from "@/components/ui/button";
import { useUserSession } from "@/providers/UserSessionProvider";
import { Rocket } from "lucide-react";
import { useTranslations } from "next-intl";

const NewQuizTrigger = () => {
  const { createNewQuizSession } = useUserSession();
  const t = useTranslations("HomePage");
  return (
    <Button
      variant={"default"}
      size={"lg"}
      className="w-full font-medium px-10 py-5 gap-2"
      onClick={() => {
        createNewQuizSession({});
      }}
    >
      {t("getSpottingButton")}
      <Rocket size={20} />
    </Button>
  );
};

export default NewQuizTrigger;
