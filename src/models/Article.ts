export const MAX_ARTICLES_PER_SESSION = 5;

export interface ArticleLocal {
  uid: string;
  headline: string;
  detail: string;
  content: string;
  is_fake: boolean;
  style_or_source: string;
}
