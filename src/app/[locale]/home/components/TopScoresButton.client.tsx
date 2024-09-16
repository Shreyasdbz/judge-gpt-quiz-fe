import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const TopScoresButton = () => {
  const t = useTranslations("HomePage");
  return (
    <Link href="/scores" className="w-full">
      <Button
        variant="outline"
        size={"default"}
        className="w-full flex items-center justify-center gap-2"
      >
        <span>{t("viewTopScoresButton")}</span>
        <BarChart size={20} />
      </Button>
    </Link>
  );
};

export default TopScoresButton;
