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
    <div className="flex w-full flex-col items-center justify-center lg:py-10 max-w-6xl">
      <span className="full font-medium text-primary lg:text-lg w-full text-left lg:text-center">
        {t("ourMission")}
      </span>
      <span className="w-full text-sm font-light text-muted-foreground lg:text-base text-left lg:text-center">
        {t("ourMissionSubtitle")}
      </span>
    </div>
  );

  const BottomFooter = () => (
    <div className="flex flex-row items-center justify-center gap-2 text-xs text-muted-foreground font-medium max-w-6xl w-full">
      <Link href={"/about"}>{t("faq&Info")}</Link>
      <Separator orientation="vertical" />
      <Link href={"/policy"}>{t("privacyPolicy")}</Link>
      <Separator orientation="vertical" />
      {/* <span>{t("contactUs")}</span>
      <Separator orientation="vertical" /> */}
      <ThemeToggleButton />
      <Separator orientation="vertical" />
      <LanguageSelectorButon />
    </div>
  );

  return (
    <div className="w-full flex items-center justify-center flex-col gap-2 self-end lg:pb-4 lg:px-10">
      {showTop && <TopFooter />}
      <Separator className="max-w-6xl" />
      {showBottom && <BottomFooter />}
    </div>
  );
};

export default Footer;
