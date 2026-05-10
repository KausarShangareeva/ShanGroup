import Hero from "@/Pages/HomePage/components/Hero";
import OfferOfMonth from "@/Pages/HomePage/components/OfferOfMonth";
import NewFeatures from "@/Pages/HomePage/components/NewFeatures";
import PropertyTabs from "@/Pages/HomePage/components/PropertyTabs";
import TrendingCommunities from "@/Pages/HomePage/components/TrendingCommunities";
import StatsStrip from "@/Pages/HomePage/components/StatsStrip";
import DevelopersStrip from "@/Pages/HomePage/components/DevelopersStrip";
import HomeBlog from "@/Pages/HomePage/components/HomeBlog";
import LeadForm from "@/Pages/HomePage/components/LeadForm";
import CountryCompare from "@/Pages/HomePage/components/CountryCompare";
import MarketPulse from "@/Pages/HomePage/components/MarketPulse";
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
      <StatsStrip />
      <DevelopersStrip />
      <OfferOfMonth />
      <NewFeatures />
      <PropertyTabs />
      <TrendingCommunities />
      <MarketPulse />
      <CountryCompare />
      <DubaiMap />
      <GoldenVisaCalc />
      <InvestorMatch />
      <HomeBlog />
      <InvestorFAQ />
      <LeadForm />
      <TelegramChannel />
      <CompareTray />
    </>
  );
}
