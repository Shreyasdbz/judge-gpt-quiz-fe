export const MAX_ARTICLES_PER_SESSION = 5;

/**
 * Primary file for the Article model.
 * @param uid - Article ID
 * @param createdAt - Article entry creation date
 * @param headline - Article headline (tilte of the article)
 * @param detail - Article detail (some key pieces of information)
 * @param content - Article content (actual content of the article)
 * @param is_fake - Article authenticity
 * @param style_or_source - Article style or source (news outlet styled from or fetched from)
 * @param origin_locale - Article origin locale (language of the original article generated or scraped)
 * @param headline_model_used - LLM used to generate the headline
 * @param content_model_used - LLM used to generate the content
 * @param translation_model_used - LLM used to translate the article
 * @param localized_headline_en - English localized headline
 * @param localized_detail_en - English localized detail
 * @param localized_content_en - English localized content
 * @param localized_headline_es - Spanish localized headline
 * @param localized_detail_es - Spanish localized detail
 * @param localized_content_es - Spanish localized content
 * @param localized_headline_fr - French localized headline
 * @param localized_detail_fr - French localized detail
 * @param localized_content_fr - French localized content
 * @param localized_headline_de - German localized headline
 * @param localized_detail_de - German localized detail
 * @param localized_content_de - German localized content
 */
export interface Article {
  uid: string;
  created_at: Date;
  headline: string;
  detail: string;
  content: string;
  is_fake: boolean;
  style_or_source: string;
  origin_locale: string;
  headline_model_used: string;
  content_model_used: string;
  translation_model_used: string;
  localized_headline_en: string;
  localized_detail_en: string;
  localized_content_en: string;
  localized_headline_es: string;
  localized_detail_es: string;
  localized_content_es: string;
  localized_headline_fr: string;
  localized_detail_fr: string;
  localized_content_fr: string;
  localized_headline_de: string;
  localized_detail_de: string;
}

/*
 * User-served article object
 * Only contains:
 * - uid
 * - headline
 * - content
 */
export interface ArticleLocal
  extends Omit<
    Article,
    | "createdAt"
    | "is_fake"
    | "detail"
    | "style_or_source"
    | "origin_locale"
    | "headline_model_used"
    | "content_model_used"
    | "translation_model_used"
    | "localized_headline_en"
    | "localized_detail_en"
    | "localized_content_en"
    | "localized_headline_es"
    | "localized_detail_es"
    | "localized_content_es"
    | "localized_headline_fr"
    | "localized_detail_fr"
    | "localized_content_fr"
    | "localized_headline_de"
    | "localized_detail_de"
  > {}
