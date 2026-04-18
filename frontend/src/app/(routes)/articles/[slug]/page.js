import ArticleDetailPage from "@/Pages/ArticlesPage/ArticleDetailPage/ArticleDetailPage";
import ARTICLES from "@/data/articles.json";

export function generateStaticParams() {
  return ARTICLES.items.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = ARTICLES.items.find((a) => a.slug === slug);
  return {
    title: article ? `${article.title} — ShanGroup` : "Статья — ShanGroup",
    description: article?.excerpt ?? "",
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ArticleDetailPage slug={slug} />;
}
