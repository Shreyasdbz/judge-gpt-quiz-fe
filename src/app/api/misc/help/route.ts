/**
 * Route to get all the API routes information
 */

import { NextRequest, NextResponse } from "next/server";

/**
 * @api [GET] /api/misc/help
 * @param req: NextRequest
 * - query: {}
 * @returns: NextResponse
 * - status: 200
 * - body: { route: { description: string, query: any, body: any } }
 */
async function GET(req: NextRequest) {
  console.log("GET request to /api/misc/help: ", req);

  const routeInformation = {
    "/api/quiz": {
      description: "Returns a set of quiz questions for the user to answer.",
      query: {
        userUid: "string",
        locale: "string",
      },
      body: "ArticleLocal[] | { error: string }",
    },
    "/api/scores": {
      description: "Method not implemented",
      query: {},
      body: { error: "Method not implemented" },
    },
    "/api/misc/hello": {
      description: "Returns a message to confirm that the API is alive.",
      query: {},
      body: { message: "Hello from API" },
    },
  };

  return NextResponse.json(routeInformation);
}

export { GET };
