"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
// import axios from "axios";

export default function ReferrerLogger() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const referrerParam = searchParams.get("referrer");
    if (referrerParam) {
      try {
        // axios.post("/api/misc/visit", { referrer: referrerParam });
      } catch (error) {
        console.error("Failed to log site visit", error);
      }
    } else {
      try {
        // axios.post("/api/misc/visit", { referrer: "none" });
      } catch (error) {
        console.error("Failed to log site visit with  no reffer", error);
      }
    }
  }, [searchParams]);

  return null; // This component doesn't render anything
}
