import DeveloperDetailPage from "@/Pages/DevelopersPage/DeveloperDetailPage/DeveloperDetailPage";
import DEVELOPERS from "@/data/developers.json";
import { devSlug, devKeyFromSlug } from "@/utils/devSlug";

export function generateStaticParams() {
  return Object.keys(DEVELOPERS).map((key) => ({ slug: devSlug(key) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const key = devKeyFromSlug(slug, DEVELOPERS);
  const dev = key ? DEVELOPERS[key] : null;
  return {
    title: key ? `${key} — ShanGroup` : "Застройщик — ShanGroup",
    description:
      dev?.info ??
      "Информация о застройщике, его проектах и комьюнити в ОАЭ.",
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <DeveloperDetailPage slug={slug} />;
}
