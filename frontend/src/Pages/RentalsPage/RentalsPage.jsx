import Hero from "./components/Hero";
import StatsBand from "./components/StatsBand";
import Why from "./components/Why";
import How from "./components/How";
import Calc from "./components/Calc";
import Listings from "./components/Listings";
import StrategyCompare from "./components/StrategyCompare";
import Areas from "./components/Areas";
import Risks from "./components/Risks";
import Cases from "./components/Cases";
import Faq from "./components/Faq";
import LeadForm from "./components/LeadForm";

// Ready Rentals landing — воронка для cashflow-инвесторов.
// Layout (Navigation/Breadcrumb/Footer) монтируется в src/app/layout.js.
// Тексты — data/i18n/{lang}/rentals.json (namespace RentalsPage).
export default function RentalsPage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Why />
      <How />
      <Calc />
      <Listings />
      <StrategyCompare />
      <Areas />
      <Risks />
      <Cases />
      <Faq />
      <LeadForm />
    </>
  );
}
