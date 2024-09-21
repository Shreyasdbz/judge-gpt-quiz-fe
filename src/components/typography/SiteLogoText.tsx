import { cn } from "@/lib/utils";
import { Outfit } from "next/font/google";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";

const outfit = Outfit({ subsets: ["latin"] });

const SiteLogoText = ({
  variant,
  includeSecondaryText,
}: {
  variant: "small" | "large";
  includeSecondaryText?: boolean;
}) => {
  const t = useTranslations("Misc");

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Link
        href={"/home"}
        className={cn(
          outfit.className,
          "flex flex-col md:flex-row md:gap-2 leading-tight tracking-tighter lg:text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black dark:from-white via-red-950 dark:via-red-100 to-green-900 dark:to-green-100",
          variant === "small" && "text-2xl lg:text-left",
          variant === "large" && "px-1 text-8xl",
          variant === "small" && "flex-row w-full"
        )}
      >
        <span>Judge</span>
        <span className={cn("", variant === "large" && "-mt-14 md:mt-0")}>
          GPT
        </span>
      </Link>
      {!!includeSecondaryText && (
        <span className="w-full text-sm font-light text-left text-muted-foreground">
          {t("siteTextSubtitle")}
        </span>
      )}
      {variant === "small" && (
        <Separator orientation="horizontal" className="w-full" />
      )}
    </div>
  );
};

export default SiteLogoText;
