"use client";
import { useTransition, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSelectorButon = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("Footer");
  const [isPending, startTransition] = useTransition();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  function onLanguageSelect(language: string) {
    setSelectedLanguage(language);

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale: language as Locale }
      );
    });
  }

  function getLanguageName(language: string) {
    switch (language) {
      case "en":
        return t("englishLanguage");
      case "es":
        return t("spanishLanguage");
      case "fr":
        return t("frenchLanguage");
      case "de":
        return t("germanLanguage");
      default:
        return "Unknown";
    }
  }

  const LanguageDropdownMenuItem = ({ language }: { language: string }) => (
    <DropdownMenuItem
      onClick={() => onLanguageSelect(language)}
      className={cn(
        "w-full gap-4",
        selectedLanguage === language
          ? "font-bold"
          : "font-normal text-muted-foreground",
        isPending ? "opacity-50 pointer-events-none" : ""
      )}
    >
      <Image
        src={`/assets/flag-${language}.png`}
        alt={`Flag of the the ${language} language`}
        width={24}
        height={12}
      />
      <span className="text-sm">{getLanguageName(language)}</span>
    </DropdownMenuItem>
  );

  useEffect(() => {
    const localeToSet = params.locale as Locale;
    setSelectedLanguage(localeToSet);
  }, [params.locale]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Image
            src={`/assets/flag-${selectedLanguage}.png`}
            alt="Next.js Logo"
            width={24}
            height={12}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("changeLanguageTitle")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LanguageDropdownMenuItem language="en" />
        <LanguageDropdownMenuItem language="es" />
        <LanguageDropdownMenuItem language="fr" />
        <LanguageDropdownMenuItem language="de" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelectorButon;
