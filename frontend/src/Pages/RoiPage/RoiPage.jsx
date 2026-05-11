import Hero from "./components/Hero";
import Calc from "./components/Calc";
import Districts from "./components/Districts";
import Scenarios from "./components/Scenarios";
import Faq from "./components/Faq";
import LeadForm from "./components/LeadForm";

// ROI Calculator landing — расчёт доходности на 3/5/10 лет по реальным данным
// Property Monitor / Bayut / DLD.
// Layout (Navigation/Breadcrumb/Footer) монтируется в src/app/layout.js.
// Тексты — data/i18n/{lang}/roi.json (namespace RoiPage).
export default function RoiPage() {
  return (
    <>
      <Hero />
      <Calc />
      <Districts />
      <Scenarios />
      <Faq />
      <LeadForm />
    </>
  );
}
