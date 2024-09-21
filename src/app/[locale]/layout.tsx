import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "../globals.css";
import { UserSessionProvider } from "@/providers/UserSessionProvider";
import ReferrerLogger from "@/components/blocks/ReferrerLogger";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Judge GPT",
  description: "Can you spot the misinformation?",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ReferrerLogger />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UserSessionProvider>{children}</UserSessionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
