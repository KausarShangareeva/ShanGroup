import Hero from "./components/Hero";
import VisualRanking from "./components/VisualRanking";
import CompareTable from "./components/CompareTable";
import CategoryLeaders from "./components/CategoryLeaders";
import ProfileQuiz from "./components/ProfileQuiz";
import AnalystInsights from "./components/AnalystInsights";
import LeadForm from "./components/LeadForm";
import styles from "./DistrictsComparePage.module.css";

// Compare Districts landing — Property Monitor Q2 2026 benchmark for 10 Dubai
// districts. Layout (Navigation/Breadcrumb/Footer/FloatingActions) is mounted
// in src/app/layout.js; everything below is page-local.
// Copy lives in data/i18n/{lang}/districts-compare.json (namespace
// DistrictsComparePage); numbers in components/data.js. Page-scoped colour
// tokens (--dc-accent*) are defined in DistrictsComparePage.module.css.
export default function DistrictsComparePage() {
  return (
    <div className={styles.page}>
      <Hero />
      <VisualRanking />
      <CompareTable />
      <CategoryLeaders />
      <ProfileQuiz />
      <AnalystInsights />
      <LeadForm />
    </div>
  );
}
