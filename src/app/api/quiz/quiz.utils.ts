import {
  Article,
  ArticleLocal,
  MAX_ARTICLES_PER_SESSION,
} from "@/models/Article";
import ProfileDb from "@/models/ProfileDb";
import ArticleDb from "@/models/ArticleDb";
import ResponseDb from "@/models/ResponseDb";
import { Response } from "@/models/QuizSession";
import { connectToDatabase } from "@/lib/db";

/**
 * ////////////////////////////////////////////////
 * Public functions
 * ////////////////////////////////////////////////
 */

/**
 * Gets a set of quiz questions for the user to answer.
 * @param userUid
 * @returns
 */
export async function fetchArticlesForUser(
  userUid: string
): Promise<ArticleLocal[] | string> {
  await connectToDatabase();

  // Step 1: Get user profile from the database
  const userResult = await ProfileDb.findOne({ uid: userUid });
  if (userResult == null) {
    return "User not found";
  }
  const articlesToExclude: string[] = userResult.servedArticles;

  // Step 2: Fetch articles from the database and exclude the served articles (limit of 5)
  const articlesResult = await ArticleDb.find({
    uid: { $nin: articlesToExclude },
  }).limit(MAX_ARTICLES_PER_SESSION);
  if (articlesResult == null) {
    return "No articles found";
  }

  return articlesResult.map(sanitizeArticleToArticleLocal);
}

/**
 *  Stores the user's response to the quiz question.
 * @param param0
 * @returns
 */
export async function storeUserResponse({
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
}): Promise<boolean | string> {
  await connectToDatabase();

  // Step 1: Get user profile from the database
  const userResult = await ProfileDb.findOne({ uid: userUid });
  if (userResult == null) {
    return "User not found";
  }

  // Step 2: Get article from the database
  const articleResult = await ArticleDb.findOne({ uid: articleUid });
  if (articleResult == null) {
    return "Article not found";
  }

  // Step 3: Update the user profile with the served article
  userResult.servedArticles.push(articleUid);
  // Step 4: Increment the total score of the user profile if the user response is correct
  if (userRespondedIsFake === articleResult.isFake) {
    userResult.totalScore += 1;
  }

  // Step 5: Save the updated user profile to the database
  const updateResult = await ProfileDb.updateOne({ uid: userUid }, userResult);
  if (updateResult == null) {
    return "Error updating user profile";
  }

  // Step 6: Store in sessions collection
  const newResponse: Response = {
    timestamp: new Date(),
    userUid: userUid,
    articleUid: articleUid,
    userRespondedIsHuman: userRespondedIsHuman,
    userRespondedIsFake: userRespondedIsFake,
    timeToRespond: timeToRespond,
  };
  const responseResult = await ResponseDb.create(newResponse);
  console.log("Response stored action result: ", responseResult);

  // Step 7: Return if user response is correct
  return userRespondedIsFake === articleResult.isFake;
}

/**
 * ////////////////////////////////////////////////
 * Internal functions
 * ////////////////////////////////////////////////
 */

function sanitizeArticleToArticleLocal(article: Article): ArticleLocal {
  return {
    uid: article.uid,
    title: article.title,
    content: article.content,
    localizedTitleEn: article.localizedTitleEn,
    localizedTitleEs: article.localizedTitleEs,
    localizedTitleFr: article.localizedTitleFr,
    localizedTitleDe: article.localizedTitleDe,
    localizedContentEn: article.localizedContentEn,
    localizedContentEs: article.localizedContentEs,
    localizedContentFr: article.localizedContentFr,
    localizedContentDe: article.localizedContentDe,
  };
}
