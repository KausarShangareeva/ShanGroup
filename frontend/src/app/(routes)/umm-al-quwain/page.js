import EmiratePage from "@/Pages/EmiratesPage/EmiratePage/EmiratePage";
import { EMIRATE_BY_SLUG } from "@/utils/properties";

const EMIRATE = EMIRATE_BY_SLUG["umm-al-quwain"];

export const metadata = {
  title: `Недвижимость в ${EMIRATE.name} — ShanGroup`,
  description: EMIRATE.description,
};

export default function Page() {
  return <EmiratePage slug="umm-al-quwain" />;
}
