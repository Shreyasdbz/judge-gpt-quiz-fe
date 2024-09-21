import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";
import LanguageSelectorButon from "./LanguageSelectorButton";
import ThemeToggleButton from "./ThemeToggleButton";

const Footer = ({ variant }: { variant: "top" | "bottom" | "both" }) => {
  const t = useTranslations("Footer");

  const showTop = variant === "top" || variant === "both";
  const showBottom = variant === "bottom" || variant === "both";

  const TopFooter = () => (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl lg:py-10">
      <span className="w-full font-medium text-left full text-primary lg:text-lg lg:text-center">
        {t("ourMission")}
      </span>
      <span className="w-full text-sm font-light text-left text-muted-foreground lg:text-base lg:text-center">
        {t("ourMissionSubtitle")}
      </span>
    </div>
  );

  const BottomFooter = () => (
    <div className="flex flex-row items-center justify-center w-full max-w-6xl gap-2 text-xs font-medium text-muted-foreground">
      <Link href={"/about"}>{t("faq&Info")}</Link>
      <Separator orientation="vertical" className="h-6" />
      <Link href={"/policy"}>{t("privacyPolicy")}</Link>
      <Separator orientation="vertical" className="h-6" />
      <ThemeToggleButton />
      <Separator orientation="vertical" className="h-6" />
      <LanguageSelectorButon />
    </div>
  );

  return (
    <div className="flex flex-col items-center self-end justify-center w-full gap-2 lg:pb-4 lg:px-10">
      {showTop && <TopFooter />}
      {(showBottom || showBottom) && <Separator className="max-w-6xl" />}
      {showBottom && <BottomFooter />}
    </div>
  );
};

export default Footer;
