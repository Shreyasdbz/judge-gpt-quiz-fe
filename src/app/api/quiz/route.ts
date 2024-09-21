import { NextRequest, NextResponse } from "next/server";
import {
  fetchArticlesForUserFromDb,
  storeUserResponseOnDb,
} from "./quiz.utils";

/**
 * [GET] /api/quiz
 * Returns a set of quiz questions for the user to answer. Returns a message or error.
 * @param req: NextRequest
 * - query: { userUid: string }
 * - body: { locale: string }
 * @returns
 * - status: 200 | 400 | 404 | 500
 * - body: ArticleLocal[] | { error: string }
 */
async function GET(req: NextRequest) {
  try {
    // Get the user ID from query parameters
    const { searchParams } = new URL(req.url);
    if (!searchParams) {
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }
    const userUid = searchParams.get("userUid");
    const locale = searchParams.get("locale");
    if (!userUid) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    if (!locale) {
      return NextResponse.json(
        { error: "Locale is required" },
        { status: 400 }
      );
    }
    if (typeof userUid !== "string") {
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }
    if (typeof locale !== "string") {
      return NextResponse.json({ error: "Invalid Locale" }, { status: 400 });
    }

    // Fetch quiz questions for the user from the server
    const questions = await fetchArticlesForUserFromDb({
      userUid,
      locale,
    });
    if (!questions) {
      return NextResponse.json(
        { error: "Quiz questions not found" },
        { status: 404 }
      );
    }

    // Success
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * [POST] /api/quiz
 * Stores the user's response to the quiz question. Returns a message or error.
 * @param req: NextRequest
 * - query: { userUid: string }
 * - body: {
 *          articleUid: string,
 *          userRespondedIsHuman: number,
 *          userRespondedIsFake: number,
 *          timeToRespond: number,
 *          localeRespondedIn: string
 *          articleIndex: number
 *         }
 * @returns
 * - status: 200 | 400 | 404 | 500
 * - body: { correct: boolean, detail: string } | { error: string }
 */
async function POST(req: NextRequest) {
  try {
    // Get the user ID from query parameters
    const { searchParams } = new URL(req.url);
    if (!searchParams) {
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }
    const userUid = searchParams.get("userUid");
    if (!userUid) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    if (typeof userUid !== "string") {
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    // Get the article ID and user response from the request body
    if (!req.body) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    const {
      articleUid,
      userRespondedIsHuman,
      userRespondedIsFake,
      timeToRespond,
      localeRespondedIn,
      articleIndex,
    } = await req.json();
    if (!articleUid) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }
    if (typeof articleUid !== "string") {
      return NextResponse.json(
        { error: "Invalid Article ID" },
        { status: 400 }
      );
    }
    if (typeof userRespondedIsHuman !== "number") {
      return NextResponse.json(
        { error: "Invalid user response" },
        { status: 400 }
      );
    }
    if (typeof userRespondedIsFake !== "number") {
      return NextResponse.json(
        { error: "Invalid user response" },
        { status: 400 }
      );
    }
    if (typeof timeToRespond !== "number") {
      return NextResponse.json(
        { error: "Invalid time to respond" },
        { status: 400 }
      );
    }
    if (typeof localeRespondedIn !== "string") {
      return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
    }
    if (typeof articleIndex !== "number") {
      return NextResponse.json(
        { error: "Invalid article index" },
        { status: 400 }
      );
    }

    // Store the user's response in the database
    const storeResult = await storeUserResponseOnDb({
      userUid,
      articleUid,
      userRespondedIsHuman,
      userRespondedIsFake,
      timeToRespond,
      localeRespondedIn,
      articleIndex,
    });
    if (typeof storeResult === "string") {
      return NextResponse.json(
        { error: "User response not stored" },
        { status: 404 }
      );
    }

    // Success
    return NextResponse.json(
      { correct: storeResult.correct, detail: storeResult.detail },
      { status: 200 }
    );

    // Error handling
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export { GET, POST };
