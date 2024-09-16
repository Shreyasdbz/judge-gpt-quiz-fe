export const MAX_ARTICLES_PER_SESSION = 5;

/**
 * Primary file for the Article model.
 * @param uid - Article ID
 * @param createdAt - Article creation date
 * @param title - Article title
 * @param content - Article content
 * @param isFake - Whether the article is fake or not
 * @param source - Article source (machine-generated if AI or actual source name if real)
 * @param modelInformation - Information about the model used to generate the article
 * @param localizedTitleEn - Localized title in English
 * @param localizedTitleFr - Localized title in French
 * @param localizedTitleEs - Localized title in Spanish
 * @param localizedTitleDe - Localized title in German
 * @param localizedContentEn - Localized content in English
 * @param localizedContentFr - Localized content in French
 * @param localizedContentEs - Localized content in Spanish
 * @param localizedContentDe - Localized content in German
 */
export interface Article {
  uid: string;
  createdAt: Date;
  title: string;
  content: string;
  isFake: boolean;
  source: string;
  modelInformation: string;
  localizedTitleEn?: string;
  localizedTitleFr?: string;
  localizedTitleEs?: string;
  localizedTitleDe?: string;
  localizedContentEn?: string;
  localizedContentFr?: string;
  localizedContentEs?: string;
  localizedContentDe?: string;
}

/*
 * User-served article object
 */
export interface ArticleLocal
  extends Omit<
    Article,
    "isFake" | "createdAt" | "source" | "modelInformation"
  > {}
