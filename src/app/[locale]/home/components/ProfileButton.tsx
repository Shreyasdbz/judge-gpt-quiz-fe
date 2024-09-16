"use client";

import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useUserSession } from "@/providers/UserSessionProvider";
import { Button } from "@/components/ui/button";

const ProfileButton = () => {
  const { localProfile } = useUserSession();
  const t = useTranslations("HomePage");

  if (localProfile === null) {
    return null;
  }

  return (
    <Link
      href="/profile"
      className="w-full flex flex-row items-center justify-center"
    >
      <Button
        variant={"secondary"}
        size={"sm"}
        className="gap-1 hover:ring-1 ring-muted-foreground/20"
      >
        <span className="font-light">{t("signedInAsText")}</span>
        <span className="font-medium">{`${localProfile.username}`}</span>
        <ChevronRight size={16} />
      </Button>
    </Link>
  );
};

export default ProfileButton;
