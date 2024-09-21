/**
 * Route for testing if API is alive
 */

import { NextRequest, NextResponse } from "next/server";

/**
 * [GET] /api/misc/hello
 * Returns a message to confirm that the API is alive.
 * A list of all API routes, their endpoints, and descriptions in JSON format.
 * @param req: NextRequest
 * - query: { getRoutes?: boolean }
 * @returns
 * - status: 200
 * - body: { message: string }
 */
async function GET(req: NextRequest) {
  console.log("GET request to /api/misc/hello: ", req);

  let toGetRoutes = false;
  const { searchParams } = new URL(req.url);
  if (searchParams) {
    const toGetRoutesParam = searchParams.get("getRoutes");
    if (toGetRoutesParam === "true") {
      toGetRoutes = true;
    }
  }

  if (toGetRoutes) {
    // TODO: Implement a function to get all API routes, their endpoints, and descriptions
    return NextResponse.json(
      { error: "Method not implemented" },
      { status: 501 }
    );
  } else {
    return NextResponse.json({ message: "Hello from JudgeGPT API" });
  }
}

export { GET };
