import Hero from "./components/Hero";
import HeadlineStats from "./components/HeadlineStats";
import TaxComparison from "./components/TaxComparison";
import SavingsCalc from "./components/SavingsCalc";
import TaxBreakdown from "./components/TaxBreakdown";
import Structures from "./components/Structures";
import Residency from "./components/Residency";
import Process from "./components/Process";
import Personas from "./components/Personas";
import Faq from "./components/Faq";
import LeadForm from "./components/LeadForm";
import styles from "./UaeTaxGuidePage.module.css";

// UAE Tax Guide landing — funnel for entrepreneurs and investors moving tax
// residency to the UAE. Layout (Navigation / Breadcrumb / Footer / Floating
// actions) is mounted in src/app/layout.js; everything below is page-local.
// Copy lives in data/i18n/{lang}/uae-tax-guide.json (namespace
// UaeTaxGuidePage). Page-scoped colour tokens (--tx-*) are defined in
// UaeTaxGuidePage.module.css.
//
// Funnel order — Discovery → Education → Personalisation → Conversion:
//   Hero            anchor message + free strategy call CTA
//   HeadlineStats   6 headline numbers (the "0% pattern")
//   TaxComparison   UAE vs RU/UK/DE/FR/US/CA — what residents keep
//   SavingsCalc     interactive — your income → your annual savings
//   TaxBreakdown    every UAE tax in one place
//   Structures      Free Zone · Mainland · Offshore (tabbed)
//   Residency       4 visa routes to tax residency
//   Process         5-step roadmap from call to TRC
//   Personas        is this for me? (founder / investor / remote)
//   Faq             the hard questions (CFC, exit tax, CRS, substance)
//   LeadForm        book the strategy call
export default function UaeTaxGuidePage() {
  return (
    <div className={styles.page}>
      <Hero />
      <HeadlineStats />
      <TaxComparison />
      <SavingsCalc />
      <TaxBreakdown />
      <Structures />
      <Residency />
      <Process />
      <Personas />
      <Faq />
      <LeadForm />
    </div>
  );
}
