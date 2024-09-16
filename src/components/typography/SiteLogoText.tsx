import { cn } from "@/lib/utils";
import { Outfit } from "next/font/google";
import { useTranslations } from "next-intl";

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
    <div className="w-full flex flex-col items-center justify-center">
      <div
        className={cn(
          outfit.className,
          "px-1 flex flex-col md:flex-row md:gap-2 leading-tight tracking-tighter lg:text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black dark:from-white via-red-950 dark:via-red-100 to-green-900 dark:to-green-100",
          variant === "small" && "text-2xl lg:text-left",
          variant === "large" && "text-8xl",
          variant === "small" && "flex-row w-full"
        )}
      >
        <span>Judge</span>
        <span className={cn("", variant === "large" && "-mt-10 md:mt-0")}>
          GPT
        </span>
      </div>
      {!!includeSecondaryText && (
        <span className="w-full text-left font-light text-muted-foreground text-sm">
          {t("siteTextSubtitle")}
        </span>
      )}
    </div>
  );
};

export default SiteLogoText;
