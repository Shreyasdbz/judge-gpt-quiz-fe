/**
 * Route for testing if API is alive
 */

import { NextRequest, NextResponse } from "next/server";

/**
 * [GET] /api/misc/hello
 * Returns a message to confirm that the API is alive.
 * @param req: NextRequest
 * - query: {}
 * @returns
 * - status: 200
 * - body: { message: string }
 */
async function GET(req: NextRequest) {
  console.log("GET request to /api/misc/hello: ", req);
  return NextResponse.json({ message: "Hello from API" });
}

export { GET };
