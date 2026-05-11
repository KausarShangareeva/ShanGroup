"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { NextIntlClientProvider } from "next-intl";

// Структура переводов: data/i18n/{lang}/{namespace}.json (kebab-case).
// Соглашение из docs i18next: один namespace = один JSON-файл.
// AR-папка пока зеркально клонирует RU — её JSON'ы заменяются на реальные
// арабские переводы по мере готовности, без изменений в этом файле.
import ruHomePage from "@/data/i18n/ru/home-page.json";
import enHomePage from "@/data/i18n/en/home-page.json";
import arHomePage from "@/data/i18n/ar/home-page.json";
import ruOffPlan from "@/data/i18n/ru/off-plan.json";
import enOffPlan from "@/data/i18n/en/off-plan.json";
import arOffPlan from "@/data/i18n/ar/off-plan.json";
import ruRentals from "@/data/i18n/ru/rentals.json";
import enRentals from "@/data/i18n/en/rentals.json";
import arRentals from "@/data/i18n/ar/rentals.json";
import ruAirbnb from "@/data/i18n/ru/airbnb.json";
import enAirbnb from "@/data/i18n/en/airbnb.json";
import arAirbnb from "@/data/i18n/ar/airbnb.json";
import ruFlip from "@/data/i18n/ru/flip.json";
import enFlip from "@/data/i18n/en/flip.json";
import arFlip from "@/data/i18n/ar/flip.json";
import ruGoldenVisa from "@/data/i18n/ru/goldenvisa.json";
import enGoldenVisa from "@/data/i18n/en/goldenvisa.json";
import arGoldenVisa from "@/data/i18n/ar/goldenvisa.json";
import ruInvestorVisa from "@/data/i18n/ru/investorvisa.json";
import enInvestorVisa from "@/data/i18n/en/investorvisa.json";
import arInvestorVisa from "@/data/i18n/ar/investorvisa.json";
import ruInstallment from "@/data/i18n/ru/installment.json";
import enInstallment from "@/data/i18n/en/installment.json";
import arInstallment from "@/data/i18n/ar/installment.json";
import ruMortgage from "@/data/i18n/ru/mortgage.json";
import enMortgage from "@/data/i18n/en/mortgage.json";
import arMortgage from "@/data/i18n/ar/mortgage.json";
import ruRoi from "@/data/i18n/ru/roi.json";
import enRoi from "@/data/i18n/en/roi.json";
import arRoi from "@/data/i18n/ar/roi.json";
import ruDistrictsCompare from "@/data/i18n/ru/districts-compare.json";
import enDistrictsCompare from "@/data/i18n/en/districts-compare.json";
import arDistrictsCompare from "@/data/i18n/ar/districts-compare.json";
import ruUaeTaxGuide from "@/data/i18n/ru/uae-tax-guide.json";
import enUaeTaxGuide from "@/data/i18n/en/uae-tax-guide.json";
import arUaeTaxGuide from "@/data/i18n/ar/uae-tax-guide.json";
import ruInvestmentReport from "@/data/i18n/ru/investment-report.json";
import enInvestmentReport from "@/data/i18n/en/investment-report.json";
import arInvestmentReport from "@/data/i18n/ar/investment-report.json";
import ruNavigation from "@/data/i18n/ru/navigation.json";
import enNavigation from "@/data/i18n/en/navigation.json";
import arNavigation from "@/data/i18n/ar/navigation.json";
import ruSearchBar from "@/data/i18n/ru/search-bar.json";
import enSearchBar from "@/data/i18n/en/search-bar.json";
import arSearchBar from "@/data/i18n/ar/search-bar.json";
import ruFooter from "@/data/i18n/ru/footer.json";
import enFooter from "@/data/i18n/en/footer.json";
import arFooter from "@/data/i18n/ar/footer.json";
import ruCommon from "@/data/i18n/ru/common.json";
import enCommon from "@/data/i18n/en/common.json";
import arCommon from "@/data/i18n/ar/common.json";

const MESSAGES = {
  ru: {
    HomePage: ruHomePage,
    OffPlanPage: ruOffPlan,
    RentalsPage: ruRentals,
    AirbnbPage: ruAirbnb,
    FlipPage: ruFlip,
    GoldenVisaPage: ruGoldenVisa,
    InvestorVisaPage: ruInvestorVisa,
    InstallmentPage: ruInstallment,
    MortgagePage: ruMortgage,
    RoiPage: ruRoi,
    DistrictsComparePage: ruDistrictsCompare,
    UaeTaxGuidePage: ruUaeTaxGuide,
    InvestmentReportPage: ruInvestmentReport,
    Navigation: ruNavigation,
    SearchBar: ruSearchBar,
    Footer: ruFooter,
    Common: ruCommon,
  },
  en: {
    HomePage: enHomePage,
    OffPlanPage: enOffPlan,
    RentalsPage: enRentals,
    AirbnbPage: enAirbnb,
    FlipPage: enFlip,
    GoldenVisaPage: enGoldenVisa,
    InvestorVisaPage: enInvestorVisa,
    InstallmentPage: enInstallment,
    MortgagePage: enMortgage,
    RoiPage: enRoi,
    DistrictsComparePage: enDistrictsCompare,
    UaeTaxGuidePage: enUaeTaxGuide,
    InvestmentReportPage: enInvestmentReport,
    Navigation: enNavigation,
    SearchBar: enSearchBar,
    Footer: enFooter,
    Common: enCommon,
  },
  ar: {
    HomePage: arHomePage,
    OffPlanPage: arOffPlan,
    RentalsPage: arRentals,
    AirbnbPage: arAirbnb,
    FlipPage: arFlip,
    GoldenVisaPage: arGoldenVisa,
    InvestorVisaPage: arInvestorVisa,
    InstallmentPage: arInstallment,
    MortgagePage: arMortgage,
    RoiPage: arRoi,
    DistrictsComparePage: arDistrictsCompare,
    UaeTaxGuidePage: arUaeTaxGuide,
    InvestmentReportPage: arInvestmentReport,
    Navigation: arNavigation,
    SearchBar: arSearchBar,
    Footer: arFooter,
    Common: arCommon,
  },
};

const DEFAULT_LOCALE = "ru";
const STORAGE_KEY = "shan-lang";

const LocaleContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

export const useLocale = () => useContext(LocaleContext);

function normalize(value) {
  if (typeof value !== "string") return null;
  const lower = value.toLowerCase();
  return MESSAGES[lower] ? lower : null;
}

export default function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const stored = normalize(localStorage.getItem(STORAGE_KEY));
      if (stored) setLocaleState(stored);
    } catch {
      /* storage unavailable */
    }
  }, []);

  // Синхронизация <html lang> и dir для RTL (арабский).
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback((next) => {
    const norm = normalize(next);
    if (!norm) return;
    setLocaleState(norm);
    try {
      localStorage.setItem(STORAGE_KEY, norm.toUpperCase());
    } catch {
      /* storage unavailable */
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={MESSAGES[locale]}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
