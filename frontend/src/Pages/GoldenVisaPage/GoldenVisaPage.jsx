import Hero from "./components/Hero";
import StatsBand from "./components/StatsBand";
import Routes from "./components/Routes";
import Benefits from "./components/Benefits";
import Check from "./components/Check";
import Process from "./components/Process";
import Listings from "./components/Listings";
import CompareVisas from "./components/CompareVisas";
import Docs from "./components/Docs";
import Cases from "./components/Cases";
import Faq from "./components/Faq";
import LeadForm from "./components/LeadForm";

// Golden Visa landing — воронка для инвесторов в резидентскую визу ОАЭ.
// Layout (Navigation/Breadcrumb/Footer) монтируется в src/app/layout.js.
// Тексты — data/i18n/{lang}/goldenvisa.json (namespace GoldenVisaPage).
export default function GoldenVisaPage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Routes />
      <Benefits />
      <Check />
      <Process />
      <Listings />
      <CompareVisas />
      <Docs />
      <Cases />
      <Faq />
      <LeadForm />
    </>
  );
}
