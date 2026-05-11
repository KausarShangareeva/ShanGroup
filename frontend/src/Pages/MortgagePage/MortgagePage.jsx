import Hero from "./components/Hero";
import Eligibility from "./components/Eligibility";
import Calc from "./components/Calc";
import Process from "./components/Process";
import Banks from "./components/Banks";
import Costs from "./components/Costs";
import Faq from "./components/Faq";
import LeadForm from "./components/LeadForm";

// Mortgage landing — ипотека для нерезидентов от 4.49% годовых.
// Layout (Navigation/Breadcrumb/Footer) монтируется в src/app/layout.js.
// Тексты — data/i18n/{lang}/mortgage.json (namespace MortgagePage).
export default function MortgagePage() {
  return (
    <>
      <Hero />
      <Eligibility />
      <Calc />
      <Process />
      <Banks />
      <Costs />
      <Faq />
      <LeadForm />
    </>
  );
}
