import Hero from "@/Pages/HomePage/components/Hero";
import OfferOfMonth from "@/Pages/HomePage/components/OfferOfMonth";
import NewProperties from "@/Pages/HomePage/components/NewProperties";
import TrendingCommunities from "@/Pages/HomePage/components/TrendingCommunities";
import PropertyTypeSection from "@/Pages/HomePage/components/PropertyTypeSection";
import WhyDubai from "@/Pages/HomePage/components/WhyDubai";
import QuoteBanner from "@/components/QuoteBanner/QuoteBanner";
import DevelopersBelt from "@/components/DevelopersBelt/DevelopersBelt";
import ExpertAnalytics from "@/Pages/HomePage/components/ExpertAnalytics";
import WhyProperty from "@/Pages/HomePage/components/WhyProperty";
import OurApproach from "@/Pages/HomePage/components/OurApproach";
import ExpertCTA from "@/Pages/HomePage/components/ExpertCTA";
import VILLAS from "@/data/properties/villas.json";
import APARTMENTS from "@/data/properties/apartments.json";
import TOWNHOUSES from "@/data/properties/townhouses.json";

export default function HomePage() {
  return (
    <>
      <Hero />
      <OfferOfMonth />
      <NewProperties />
      <PropertyTypeSection
        tag="Виллы"
        title="Виллы на продажу"
        properties={VILLAS}
        catalogHref="/villas"
      />
      <PropertyTypeSection
        tag="Апартаменты"
        title="Апартаменты на продажу"
        properties={APARTMENTS}
        catalogHref="/apartments"
        dark
      />
      <PropertyTypeSection
        tag="Таунхаусы"
        title="Таунхаусы на продажу"
        properties={TOWNHOUSES}
        catalogHref="/townhouses"
      />
      <TrendingCommunities />
      <QuoteBanner />
      <WhyDubai />
      <DevelopersBelt />
      <WhyProperty />
      <OurApproach />
      <ExpertAnalytics />
      <ExpertCTA />
    </>
  );
}
