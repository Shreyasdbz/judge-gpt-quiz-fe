import { ArticleLocal } from "@/models/Article";
import { QuizSession } from "@/models/QuizSession";
import axios from "axios";

export async function createQuizSessionFromServer(
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

export async function recordUserResponseOnServer({
  userUid,
  articleUid,
  userRespondedIsHuman,
  userRespondedIsFake,
  timeToRespond,
}: {
  userUid: string;
  articleUid: string;
  userRespondedIsHuman: boolean;
  userRespondedIsFake: boolean;
  timeToRespond: number;
}) {
  const response = await axios.post(
    "/api/quiz",
    {
      articleUid: articleUid,
      userRespondedIsHuman: userRespondedIsHuman,
      userRespondedIsFake: userRespondedIsFake,
      timeToRespond: timeToRespond,
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
