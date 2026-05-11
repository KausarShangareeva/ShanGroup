import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import MarketSize from "./components/MarketSize";
import SegmentSplit from "./components/SegmentSplit";
import ForecastChart from "./components/ForecastChart";
import HotDistricts from "./components/HotDistricts";
import MacroDrivers from "./components/MacroDrivers";
import Risks from "./components/Risks";
import Toc from "./components/Toc";
import Methodology from "./components/Methodology";
import Authors from "./components/Authors";
import Faq from "./components/Faq";
import LeadForm from "./components/LeadForm";
import styles from "./InvestmentReportPage.module.css";

// Investment Report 2026 landing — institutional research funnel for investors
// and family offices. Layout (Navigation / Breadcrumb / Footer / Floating
// actions) comes from src/app/layout.js; everything below is page-local.
// Copy: data/i18n/{lang}/investment-report.json (namespace InvestmentReportPage).
// Page-scoped tokens (--ir-*) live in InvestmentReportPage.module.css.
//
// Funnel order — Authority → Evidence → Differentiation → Conversion:
//   Hero            anchor message + report cover mockup + CTAs
//   Highlights      6-card executive summary (the headline findings)
//   MarketSize      4 macro numbers (the addressable market)
//   SegmentSplit    asset-class breakdown with share / growth / yield
//   ForecastChart   indexed price forecast — bull / base / bear
//   HotDistricts    5 districts to watch — thesis + metrics
//   MacroDrivers    6 structural drivers (population, visa, tourism, tax)
//   Risks           3 honest risks + stress tests (credibility move)
//   Toc             what the 112 pages actually cover
//   Methodology     sources, model, peer review (research-desk credibility)
//   Authors         lead author + research head + macro strategist
//   Faq             pre-conversion objection handling
//   LeadForm        report download request (work email + Q&A toggle)
export default function InvestmentReportPage() {
  return (
    <div className={styles.page}>
      <Hero />
      <Highlights />
      <MarketSize />
      <SegmentSplit />
      <ForecastChart />
      <HotDistricts />
      <MacroDrivers />
      <Risks />
      <Toc />
      <Methodology />
      <Authors />
      <Faq />
      <LeadForm />
    </div>
  );
}
