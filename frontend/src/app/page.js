import Hero from "@/Pages/HomePage/components/Hero";
import OfferOfMonth from "@/Pages/HomePage/components/OfferOfMonth";
import PropertyTabs from "@/Pages/HomePage/components/PropertyTabs";
import StatsStrip from "@/Pages/HomePage/components/StatsStrip";
import DevelopersStrip from "@/Pages/HomePage/components/DevelopersStrip";
import HomeBlog from "@/Pages/HomePage/components/HomeBlog";
import LeadForm from "@/Pages/HomePage/components/LeadForm";
import CountryCompare from "@/Pages/HomePage/components/CountryCompare";
import DubaiMap from "@/Pages/HomePage/components/DubaiMap";
import InvestorFAQ from "@/Pages/HomePage/components/InvestorFAQ";
import TelegramChannel from "@/Pages/HomePage/components/TelegramChannel";
import GoldenVisaCalc from "@/Pages/HomePage/components/GoldenVisaCalc";
import InvestorMatch from "@/Pages/HomePage/components/InvestorMatch";
import CompareTray from "@/Pages/HomePage/components/CompareTray";

export default function HomePage() {
  return (
    <>
      <Hero />
      <OfferOfMonth />
      <PropertyTabs />
      <StatsStrip />
      <DevelopersStrip />
      <HomeBlog />
      <GoldenVisaCalc />
      <InvestorMatch />
      <LeadForm />
      <CountryCompare />
      <DubaiMap />
      <InvestorFAQ />
      <TelegramChannel />
      <CompareTray />
    </>
  );
}
