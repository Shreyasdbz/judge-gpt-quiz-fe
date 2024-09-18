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

  // Article selection logic ~~
  let articlesToExclude: string[] = [];
  // Exclude articles that have already been served to the user
  if (userResult.served_articles != null) {
    articlesToExclude = userResult.served_articles;
  }
  // Limit fetching articles where origin_locale is the user's locale
  // Fetch articles from the database
  const fetchedArticles = await ArticleDb.find({
    uid: { $nin: articlesToExclude },
    origin_locale: { $eq: locale },
  }).limit(MAX_ARTICLES_PER_SESSION);

  // If fetched articles are less than the limit, fetch articles from other locales
  if (fetchedArticles.length < MAX_ARTICLES_PER_SESSION) {
    const remainingArticlesCount =
      MAX_ARTICLES_PER_SESSION - fetchedArticles.length;
    const remainingArticles = await ArticleDb.find({
      uid: { $nin: articlesToExclude },
      origin_locale: { $ne: locale },
    }).limit(remainingArticlesCount);
    fetchedArticles.push(...remainingArticles);
  }

  if (fetchedArticles == null) {
    return "No articles found";
  }

  // If limit still not reached, errror out
  if (fetchedArticles.length < MAX_ARTICLES_PER_SESSION) {
    return "Not enough articles found";
  }

  // For each article where locale, sanitize and return
  const articlesLocal: ArticleLocal[] = [];

  for (const article of fetchedArticles) {
    if (article.origin_locale === locale) {
      articlesLocal.push({
        uid: article.uid,
        headline: article.headline,
        detail: article.detail,
        content: article.content,
      });
    } else {
      // Map users's locale to each translation
      if (locale === "en") {
        articlesLocal.push({
          uid: article.uid,
          headline: article.localized_headline_en,
          detail: article.localized_detail_en,
          content: article.localized_content_en,
        });
      } else if (locale === "es") {
        articlesLocal.push({
          uid: article.uid,
          headline: article.localized_headline_es,
          detail: article.localized_detail_es,
          content: article.localized_content_es,
        });
      } else if (locale === "fr") {
        articlesLocal.push({
          uid: article.uid,
          headline: article.localized_headline_fr,
          detail: article.localized_detail_fr,
          content: article.localized_content_fr,
        });
      } else if (locale === "de") {
        articlesLocal.push({
          uid: article.uid,
          headline: article.localized_headline_de,
          detail: article.localized_detail_de,
          content: article.localized_content_de,
        });
      } else {
        articlesLocal.push({
          uid: article.uid,
          headline: article.headline,
          detail: article.detail,
          content: article.content,
        });
      }
    }
  }

  return articlesLocal;
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
  if (userResult.served_articles == null) {
    userResult.served_articles = [];
    userResult.served_articles.push(articleUid);
  } else {
    userResult.served_articles.push(articleUid);
  }
  // Step 4: Increment the total score of the user profile if the user response is correct
  const isFakeResponseBoolean = userRespondedIsFake === 1 ? true : false;
  if (isFakeResponseBoolean === articleResult.is_fake) {
    userResult.total_score += 1;
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
