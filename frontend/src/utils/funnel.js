// Хелперы воронки (PropertyTabs, NewFeatures, CompareTray, FavoritesPage).
// Объекты лежат в data/i18n/{lang}/properties/funnel-properties.json, агенты —
// в data/i18n/{lang}/people/agents.json (реестр по slug). useFunnel() подмешивает
// агента к каждой записи объекта по agentId, чтобы потребители получили привычный
// item.agent.{name,role,phone,email,whatsapp,avatar}.

import { useMemo } from "react";
import { useLocale } from "@/context/I18nProvider";

import ruFunnel from "@/data/i18n/ru/properties/funnel-properties.json";
import enFunnel from "@/data/i18n/en/properties/funnel-properties.json";
import arFunnel from "@/data/i18n/ar/properties/funnel-properties.json";
import ruAgents from "@/data/i18n/ru/people/agents.json";
import enAgents from "@/data/i18n/en/people/agents.json";
import arAgents from "@/data/i18n/ar/people/agents.json";

const FUNNEL_BY_LOCALE = { ru: ruFunnel, en: enFunnel, ar: arFunnel };
const AGENTS_BY_LOCALE = { ru: ruAgents, en: enAgents, ar: arAgents };

function hydrate(funnel, agents) {
  const properties = {};
  for (const [id, raw] of Object.entries(funnel.properties)) {
    const { agentId, ...rest } = raw;
    properties[id] = { ...rest, agent: agents[agentId] };
  }
  return {
    FUNNEL_PROPERTIES: properties,
    FUNNEL_TABS: funnel.tabs,
    NEW_FEATURE_IDS: funnel.newFeatureIds,
  };
}

const RU_HYDRATED = hydrate(ruFunnel, ruAgents);

export const FUNNEL_PROPERTIES = RU_HYDRATED.FUNNEL_PROPERTIES;
export const FUNNEL_TABS = RU_HYDRATED.FUNNEL_TABS;
export const NEW_FEATURE_IDS = RU_HYDRATED.NEW_FEATURE_IDS;

export function useFunnel() {
  const { locale } = useLocale();
  return useMemo(() => {
    const funnel = FUNNEL_BY_LOCALE[locale] || ruFunnel;
    const agents = AGENTS_BY_LOCALE[locale] || ruAgents;
    return hydrate(funnel, agents);
  }, [locale]);
}

export function formatPrice(n) {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  return "$" + Math.round(n / 1000) + "K";
}

// Visa eligibility from price (in USD), per UAE rules:
//   ≥ $545K → 10y Golden Visa, ≥ $205K → 2y residence, else none.
export function visaTier(price) {
  if (price >= 545_000) return "10y";
  if (price >= 205_000) return "2y";
  return "none";
}
