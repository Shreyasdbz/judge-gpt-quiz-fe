"use client";
// import { QuizProvider } from "@/providers/QuizProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* <QuizProvider>{children}</QuizProvider> */}
    </>
  );
}
