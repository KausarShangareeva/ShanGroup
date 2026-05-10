import Hero from "./components/Hero";
import StatsBand from "./components/StatsBand";
import HowItWorks from "./components/HowItWorks";
import PaymentPlan from "./components/PaymentPlan";
import Economics from "./components/Economics";
import Calc from "./components/Calc";
import Projects from "./components/Projects";
import Compare from "./components/Compare";
import Risks from "./components/Risks";
import Cases from "./components/Cases";
import Faq from "./components/Faq";
import LeadForm from "./components/LeadForm";

// Flip strategy landing — воронка для спекулятивных инвесторов.
// Layout (Navigation/Breadcrumb/Footer) монтируется в src/app/layout.js.
// Тексты — data/i18n/{lang}/flip.json (namespace FlipPage).
export default function FlipPage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <HowItWorks />
      <PaymentPlan />
      <Economics />
      <Calc />
      <Projects />
      <Compare />
      <Risks />
      <Cases />
      <Faq />
      <LeadForm />
    </>
  );
}
