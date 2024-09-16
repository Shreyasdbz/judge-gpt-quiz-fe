import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const SupportedLocales = [
  "en", // English
  "es", // Spanish
  "fr", // French
  "de", // German
] as const;

export const routing = defineRouting({
  locales: SupportedLocales,
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/home": {
      en: "/home",
      es: "/inicio",
      fr: "/accueil",
      de: "/startseite",
    },
    "/quiz": {
      en: "/quiz",
      es: "/cuestionario",
      fr: "/quiz",
      de: "/quiz",
    },
    "/scores": {
      en: "/scores",
      es: "/puntuaciones",
      fr: "/scores",
      de: "/ergebnisse",
    },
    "/profile": {
      en: "/profile",
      es: "/perfil",
      fr: "/profil",
      de: "/profil",
    },
    "/policy": {
      en: "/policy",
      es: "/politica",
      fr: "/politique",
      de: "/politik",
    },
    "/about": {
      en: "/about",
      es: "/acerca-de",
      fr: "/a-propos",
      de: "/uber",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation(routing);
