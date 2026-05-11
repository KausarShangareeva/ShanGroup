import Hero from "./components/Hero";
import VsMortgage from "./components/VsMortgage";
import How from "./components/How";
import Calc from "./components/Calc";
import Benefits from "./components/Benefits";
import Developers from "./components/Developers";
import Faq from "./components/Faq";
import LeadForm from "./components/LeadForm";

// Installment 1%/month landing — рассрочка от застройщика без банка.
// Layout (Navigation/Breadcrumb/Footer) монтируется в src/app/layout.js.
// Тексты — data/i18n/{lang}/installment.json (namespace InstallmentPage).
export default function InstallmentPage() {
  return (
    <>
      <Hero />
      <VsMortgage />
      <How />
      <Calc />
      <Benefits />
      <Developers />
      <Faq />
      <LeadForm />
    </>
  );
}
