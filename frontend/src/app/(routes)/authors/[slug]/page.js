import AuthorDetailPage from "@/Pages/AuthorsPage/AuthorDetailPage/AuthorDetailPage";
import AUTHORS from "@/data/authors.json";

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = AUTHORS.find((a) => a.slug === slug);
  return {
    title: author ? `${author.name} — ShanGroup` : "Агент — ShanGroup",
    description: author?.bio ?? "",
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <AuthorDetailPage slug={slug} />;
}
