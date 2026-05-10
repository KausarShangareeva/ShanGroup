import Hero from "./components/Hero";
import StatsBand from "./components/StatsBand";
import Why from "./components/Why";
import How from "./components/How";
import Calc from "./components/Calc";
import Launches from "./components/Launches";
import Compare from "./components/Compare";
import Risks from "./components/Risks";
import Cases from "./components/Cases";
import Faq from "./components/Faq";
import LeadForm from "./components/LeadForm";

// Off-plan strategy landing.
// Маркетинговая воронка для инвесторов: AWARENESS → INTEREST → EDUCATION
// → ENGAGEMENT → CONVERSION.
//
// Layout (Navigation/Breadcrumb/Footer) живёт в src/app/layout.js — здесь
// рендерим только секции страницы. Все тексты — в data/i18n/{lang}/off-plan.json
// (namespace OffPlanPage), числовые данные/изображения — статикой внутри
// компонентов.
export default function OffPlanPage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Why />
      <How />
      <Calc />
      <Launches />
      <Compare />
      <Risks />
      <Cases />
      <Faq />
      <LeadForm />
    </>
  );
}
