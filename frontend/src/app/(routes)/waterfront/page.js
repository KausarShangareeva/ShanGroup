import CatalogTypePage from "@/Pages/CatalogPage/CatalogTypePage/CatalogTypePage";
import { PROPERTY_TYPE_BY_SLUG } from "@/utils/properties";

const TYPE = PROPERTY_TYPE_BY_SLUG.waterfront;

export const metadata = {
  title: `${TYPE.title} — ShanGroup`,
  description: TYPE.subtitle,
};

export default function Page() {
  return <CatalogTypePage typeSlug="waterfront" />;
}
