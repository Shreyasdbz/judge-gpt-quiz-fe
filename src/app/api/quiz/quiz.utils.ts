import { ArticleLocal, MAX_ARTICLES_PER_SESSION } from "@/models/Article";
import ProfileDb from "@/models/ProfileDb";
import ArticleDb from "@/models/ArticleDb";
import ResponseDb from "@/models/ResponseDb";
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
export async function fetchArticlesForUserFromDb({
  userUid,
  locale,
}: {
  userUid: string;
  locale: string;
}): Promise<ArticleLocal[] | string> {
  await connectToDatabase();

  // Get user profile from the database
  const userResult = await ProfileDb.findOne({ uid: userUid });
  if (userResult == null) {
    return "User not found";
  }
  const articlesToExclude: string[] = userResult.servedArticles;

  // TODO: Implement locale logic
  // Based on users's local fetch articles that have origin_locale as the user's locale
  // If less than 5 articles are found, fetch other articles
  const articlesResult = await ArticleDb.find({
    uid: { $nin: articlesToExclude },
    origin_locale: { $eq: locale },
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
export async function storeUserResponseOnDb({
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
  userRespondedIsHuman: number;
  userRespondedIsFake: number;
  timeToRespond: number;
  localeRespondedIn: string;
  articleIndex: number;
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
  if (userResult.servedArticles == null) {
    userResult.servedArticles = [articleUid];
  } else {
    userResult.servedArticles.push(articleUid);
  }
  // Step 4: Increment the total score of the user profile if the user response is correct
  if (userRespondedIsFake === articleResult.isFake) {
    userResult.totalScore += 1;
  }

  // Step 5: Save the updated user profile to the database
  const updateResult = await ProfileDb.updateOne({ uid: userUid }, userResult);
  if (updateResult == null) {
    return "Error updating user profile";
  }

  // Step 6: Store in responses collection
  const responseResult = await ResponseDb.create({
    timestamp: new Date(),
    user_uid: userUid,
    article_uid: articleUid,
    user_responded_is_human: userRespondedIsHuman,
    user_responded_is_fake: userRespondedIsFake,
    time_to_respond: timeToRespond,
    locale_responded_in: localeRespondedIn,
    article_index: articleIndex,
  });
  console.log("Response stored action result: ", responseResult);

  // Step 7: Return if user response is correct
  return userRespondedIsFake === articleResult.isFake;
}

/**
 * ////////////////////////////////////////////////
 * Internal functions
 * ////////////////////////////////////////////////
 */

function sanitizeArticleToArticleLocal({
  uid,
  headline,
  detail,
  content,
}: {
  uid: string;
  headline: string;
  detail: string;
  content: string;
}): ArticleLocal {
  const localArticle: ArticleLocal = {
    uid,
    headline,
    detail,
    content,
  };
  return localArticle;
}
