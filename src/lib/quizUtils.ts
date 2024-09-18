import { ArticleLocal } from "@/models/Article";
import { QuizSession } from "@/models/Response";
import axios from "axios";

/**
 * Makes a GET request to the server to create a new quiz session
 *  and retrieve articles to be served in the quiz.
 * @param userUid
 * @param locale
 * @returns
 */
export async function createQuizSessionOnServer(
  userUid: string,
  locale: string
): Promise<QuizSession | null> {
  const response = await axios.get("/api/quiz", {
    params: {
      userUid: userUid,
      locale: locale,
    },
  });
  if (response.status != 200) {
    return null;
  }

  // Create a new QuizSession object
  const articles = response.data as ArticleLocal[];
  const newQuizSession: QuizSession = {
    articles: articles,
    currentArticleIndex: 0,
  };
  return newQuizSession;
}

/**
 * Makes a POST request to the server to record the user's response
 * @param userUid: string
 * @param articleUid: string
 * @param userRespondedIsHuman: boolean
 * @param userRespondedIsFake: boolean
 * @param timeToRespond: number
 * @param localeRespondedIn: string
 * @param articleIndex: number
 * @returns
 */
export async function recordUserResponseOnServer({
  userUid,
  articleUid,
  userRespondedIsHuman,
  userRespondedIsFake,
  timeToRespond,
  localeRespondedIn,
  articleIndex,
}: {
  userUid: string;
  articleUid: string;
  userRespondedIsHuman: boolean;
  userRespondedIsFake: boolean;
  timeToRespond: number;
  localeRespondedIn: string;
  articleIndex: number;
}) {
  const response = await axios.post(
    "/api/quiz",
    {
      articleUid: articleUid,
      userRespondedIsHuman: userRespondedIsHuman ? 1 : 0,
      userRespondedIsFake: userRespondedIsFake ? 1 : 0,
      timeToRespond: timeToRespond,
      localeRespondedIn: localeRespondedIn,
      articleIndex: articleIndex,
    },
    {
      params: {
        userUid: userUid,
      },
    }
  );

  if (response.status != 200) {
    return false;
  }

  return response.data.isCorrect;
}
