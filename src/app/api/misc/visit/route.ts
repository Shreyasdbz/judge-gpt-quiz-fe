/**
 * Records a site visit and related data
 */

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import VisitDb from "@/models/VisitDb";
import { getGeoLocationInfo } from "../../profile/profile.utils";
import { IpGeoInfoDb } from "@/models/ProfileDb";

/**
 * [POST] /api/misc/visit
 * Records a  visit and related data
 * @param req: NextRequest
 * - headers: { x-forwarded-for: string }
 * - query: { }
 * - body: { referrer: string }
 * @returns NextResponse
 * - status: 200 | 500
 */

export async function POST(req: NextRequest) {
  // Get headers for "x-forwarded-for" property
  const originIpAddr = req.headers.get("x-forwarded-for");
  if (!originIpAddr) {
    return NextResponse.json(
      { error: "IP Address not found in headers" },
      { status: 400 }
    );
  }

  // Parse body
  if (!req.body) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  const data = await req.json();
  if (!data.referrer) {
    return NextResponse.json(
      { error: "Referrer is required" },
      { status: 400 }
    );
  }
  if (typeof data.referrer !== "string") {
    return NextResponse.json({ error: "Invalid Referrer" }, { status: 400 });
  }

  // Log the site visit
  const success = await logSiteVisitToDb({
    originIpAddr,
    referrer: data.referrer,
  });
  if (!success) {
    return NextResponse.json(
      { error: "Failed to log site visit" },
      { status: 500 }
    );
  }

  return NextResponse.json({ status: 200 });
}

/**
 * Util function to log site visit to database
 * @param originIpAddr: string - IP address of the visitor
 * @param referrer: string - Referrer URL
 * @returns boolean | null - Success status
 */
async function logSiteVisitToDb({
  originIpAddr,
  referrer,
}: {
  originIpAddr: string;
  referrer: string;
}): Promise<boolean | null> {
  const timestamp = new Date();

  // Get geo location data from IP address
  let geoInfo: IpGeoInfoDb = {};
  const geoInfoResult = await getGeoLocationInfo(originIpAddr);
  if (geoInfoResult) {
    geoInfo = geoInfoResult;
  }

  await connectToDatabase();

  const logVisitResult = await VisitDb.create({
    referrer: referrer,
    timestamp: timestamp,
    ip_geo_location: geoInfo,
  });
  if (!logVisitResult) {
    return null;
  }

  return true;
}
