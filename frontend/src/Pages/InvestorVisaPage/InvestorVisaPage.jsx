import Hero from "./components/Hero";
import StatsBand from "./components/StatsBand";
import WhoFor from "./components/WhoFor";
import Benefits from "./components/Benefits";
import VsGolden from "./components/VsGolden";
import Check from "./components/Check";
import Process from "./components/Process";
import Listings from "./components/Listings";
import Docs from "./components/Docs";
import Fees from "./components/Fees";
import Cases from "./components/Cases";
import Faq from "./components/Faq";
import LeadForm from "./components/LeadForm";

// Investor Visa landing — стартовая виза ($204K+, 2 года).
// Layout (Navigation/Breadcrumb/Footer) монтируется в src/app/layout.js.
// Тексты — data/i18n/{lang}/investorvisa.json (namespace InvestorVisaPage).
export default function InvestorVisaPage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <WhoFor />
      <Benefits />
      <VsGolden />
      <Check />
      <Process />
      <Listings />
      <Docs />
      <Fees />
      <Cases />
      <Faq />
      <LeadForm />
    </>
  );
}
