import { NextRequest, NextResponse } from "next/server";
import { MockProfiles } from "@/mock/Profiles.mock";
import { MockArticles } from "@/mock/Articles.mock";
import { connectToDatabase } from "@/lib/db";
import ProfileDb from "@/models/ProfileDb";
import ArticleDb from "@/models/ArticleDb";
import { unicodeToHTML } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    if (!searchParams) {
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }
    const seedFunction = searchParams.get("seedFunction");
    if (seedFunction === "profiles") {
      await connectToDatabase();
      // Add mock profiles to the database
      MockProfiles.map(async (profile) => {
        await ProfileDb.create({
          uid: profile.uid,
          username: profile.username,
          gender: profile.gender,
          ageGroup: profile.ageGroup,
          educationLevel: profile.educationLevel,
          employmentStatus: profile.employmentStatus,
          politicalAffiliation: profile.politicalAffiliation,
          locale: profile.locale,
          totalScore: profile.totalScore,
          servedArticles: profile.servedArticles,
        });
      });
      return NextResponse.json({ message: "Profiles added to the database" });
    } else if (seedFunction === "articles") {
      // Add mock articles to the database
      await connectToDatabase();
      MockArticles.map(async (article) => {
        await ArticleDb.create({
          uid: article.uid,
          createdAt: new Date(),
          title: unicodeToHTML(article.title),
          content: unicodeToHTML(article.content),
          isFake: article.isFake,
          source: unicodeToHTML(article.source),
          modelInformation: unicodeToHTML(article.modelInformation),
          localizedTitleEn: unicodeToHTML(article.localizedTitleEn || ""),
          localizedTitleEs: unicodeToHTML(article.localizedTitleEs || ""),
          localizedTitleFr: unicodeToHTML(article.localizedTitleFr || ""),
          localizedTitleDe: unicodeToHTML(article.localizedTitleDe || ""),
          localizedContentEn: unicodeToHTML(article.localizedContentEn || ""),
          localizedContentEs: unicodeToHTML(article.localizedContentEs || ""),
          localizedContentFr: unicodeToHTML(article.localizedContentFr || ""),
          localizedContentDe: unicodeToHTML(article.localizedContentDe || ""),
        });
      });
      return NextResponse.json({ message: "Articles added to the database" });
    } else {
      // Method not allowed
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
