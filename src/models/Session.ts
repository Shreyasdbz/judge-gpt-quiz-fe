import { ArticleLocal } from "./Article";

export interface QuizSession {
  articles: ArticleLocal[];
  currentArticleIndex: number;
}

export interface Session {
  timestamp: Date;
  userUid: string;
  articleUid: string;
  userRespondedIsHuman: boolean;
  userRespondedIsFake: boolean;
  timeToRespond: number;
  localeRespondedIn: string;
  articleIndex: number;
}
