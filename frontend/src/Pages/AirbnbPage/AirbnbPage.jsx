import Hero from "./components/Hero";
import StatsBand from "./components/StatsBand";
import Service from "./components/Service";
import Economics from "./components/Economics";
import Calc from "./components/Calc";
import Areas from "./components/Areas";
import Compare from "./components/Compare";
import Risks from "./components/Risks";
import Cases from "./components/Cases";
import Faq from "./components/Faq";
import LeadForm from "./components/LeadForm";

// Short-term / Airbnb rental landing — воронка для hospitality-инвесторов.
// Layout (Navigation/Breadcrumb/Footer) монтируется в src/app/layout.js.
// Тексты — data/i18n/{lang}/airbnb.json (namespace AirbnbPage).
export default function AirbnbPage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Service />
      <Economics />
      <Calc />
      <Areas />
      <Compare />
      <Risks />
      <Cases />
      <Faq />
      <LeadForm />
    </>
  );
}
