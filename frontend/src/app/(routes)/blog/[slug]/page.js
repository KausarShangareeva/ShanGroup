import BlogDetailPage from "@/Pages/BlogPage/BlogDetailPage/BlogDetailPage";
import BLOG from "@/data/blog.json";

export function generateStaticParams() {
  return BLOG.items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG.items.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} — ShanGroup` : "Блог — ShanGroup",
    description: post?.excerpt ?? "",
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <BlogDetailPage slug={slug} />;
}
