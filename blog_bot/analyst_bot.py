"""
analystBot — Сборщик рыночных данных.
Тянет статистику с DLD Open Data и Property Monitor,
возвращает структурированный словарь для writerBot.
"""
import requests
from datetime import datetime, timedelta
from config import DLD_BASE_URL, PROPERTY_MONITOR_URL, PROPERTY_MONITOR_API_KEY


# ── DLD Open Data ────────────────────────────────────────────────────────────

def fetch_dld_transactions(days_back: int = 30) -> dict:
    """
    Получает статистику сделок купли-продажи за последние N дней.
    DLD публикует данные бесплатно без ключа.
    Документация: https://dubailand.gov.ae/en/open-data/real-estate-data/
    """
    date_from = (datetime.today() - timedelta(days=days_back)).strftime("%Y-%m-%d")
    date_to   = datetime.today().strftime("%Y-%m-%d")

    try:
        resp = requests.get(
            f"{DLD_BASE_URL}/transactions",
            params={
                "dateFrom": date_from,
                "dateTo":   date_to,
                "type":     "sales",
            },
            timeout=15,
        )
        resp.raise_for_status()
        data = resp.json()

        transactions = data.get("result", [])
        total_value  = sum(t.get("amount", 0) for t in transactions)
        avg_price    = total_value / len(transactions) if transactions else 0

        return {
            "period":            f"{date_from} — {date_to}",
            "total_transactions": len(transactions),
            "total_value_aed":   total_value,
            "avg_price_aed":     round(avg_price),
            "source":            "DLD Open Data",
        }

    except Exception as e:
        print(f"[analystBot] DLD error: {e}")
        return _dld_mock()


def fetch_dld_by_area(area: str) -> dict:
    """Сделки по конкретному району (например 'Dubai Marina')."""
    try:
        resp = requests.get(
            f"{DLD_BASE_URL}/transactions",
            params={"area": area, "type": "sales"},
            timeout=15,
        )
        resp.raise_for_status()
        data  = resp.json().get("result", [])
        total = sum(t.get("amount", 0) for t in data)

        return {
            "area":         area,
            "transactions": len(data),
            "total_aed":    total,
            "avg_psf":      round(total / max(sum(t.get("area_sqft", 1) for t in data), 1), 0),
        }
    except Exception as e:
        print(f"[analystBot] DLD area error: {e}")
        return {"area": area, "transactions": 0, "total_aed": 0, "avg_psf": 0}


# ── Property Monitor ─────────────────────────────────────────────────────────

def fetch_price_trends(property_type: str = "apartment") -> dict:
    """
    Тренды цен с Property Monitor.
    property_type: 'apartment' | 'villa' | 'townhouse'
    """
    if not PROPERTY_MONITOR_API_KEY:
        print("[analystBot] PROPERTY_MONITOR_API_KEY not set, using mock data")
        return _pm_mock(property_type)

    try:
        headers = {"Authorization": f"Bearer {PROPERTY_MONITOR_API_KEY}"}
        resp = requests.get(
            f"{PROPERTY_MONITOR_URL}/price-index",
            params={"type": property_type, "emirate": "dubai"},
            headers=headers,
            timeout=15,
        )
        resp.raise_for_status()
        data = resp.json()

        return {
            "type":           property_type,
            "avg_price_psf":  data.get("avgPricePsf"),
            "yoy_change_pct": data.get("yoyChangePct"),
            "mom_change_pct": data.get("momChangePct"),
            "source":         "Property Monitor",
        }
    except Exception as e:
        print(f"[analystBot] Property Monitor error: {e}")
        return _pm_mock(property_type)


def fetch_rental_yields(area: str = "Dubai Marina") -> dict:
    """Арендная доходность по району."""
    if not PROPERTY_MONITOR_API_KEY:
        return _yield_mock(area)

    try:
        headers = {"Authorization": f"Bearer {PROPERTY_MONITOR_API_KEY}"}
        resp = requests.get(
            f"{PROPERTY_MONITOR_URL}/rental-yields",
            params={"area": area},
            headers=headers,
            timeout=15,
        )
        resp.raise_for_status()
        data = resp.json()

        return {
            "area":       area,
            "gross_yield": data.get("grossYield"),
            "net_yield":   data.get("netYield"),
            "avg_rent":    data.get("avgAnnualRent"),
        }
    except Exception as e:
        print(f"[analystBot] Yield error: {e}")
        return _yield_mock(area)


# ── Главная функция ───────────────────────────────────────────────────────────

def collect_market_data(topic: str, areas: list[str] | None = None) -> dict:
    """
    Собирает все данные по теме статьи.
    Возвращает словарь, который передаётся в writerBot.
    """
    areas = areas or ["Dubai Marina", "Downtown Dubai", "Business Bay"]

    print("[analystBot] Collecting DLD transactions...")
    transactions = fetch_dld_transactions(days_back=30)

    print("[analystBot] Collecting price trends...")
    prices_apt   = fetch_price_trends("apartment")
    prices_villa = fetch_price_trends("villa")

    print("[analystBot] Collecting area data...")
    area_data = [fetch_dld_by_area(a) for a in areas]

    print("[analystBot] Collecting rental yields...")
    yields = [fetch_rental_yields(a) for a in areas[:2]]

    return {
        "topic":         topic,
        "collected_at":  datetime.now().isoformat(),
        "transactions":  transactions,
        "price_trends":  {"apartment": prices_apt, "villa": prices_villa},
        "areas":         area_data,
        "rental_yields": yields,
    }


# ── Mock данные (когда API недоступен) ───────────────────────────────────────

def _dld_mock() -> dict:
    return {
        "period":             "2026-03-08 — 2026-04-07",
        "total_transactions": 4_821,
        "total_value_aed":    9_640_000_000,
        "avg_price_aed":      1_998_756,
        "source":             "DLD Open Data (mock)",
    }

def _pm_mock(property_type: str) -> dict:
    mocks = {
        "apartment": {"avg_price_psf": 1_820, "yoy_change_pct": 12.4, "mom_change_pct": 1.1},
        "villa":     {"avg_price_psf": 2_450, "yoy_change_pct": 17.8, "mom_change_pct": 2.3},
        "townhouse": {"avg_price_psf": 1_650, "yoy_change_pct": 9.6,  "mom_change_pct": 0.7},
    }
    m = mocks.get(property_type, mocks["apartment"])
    return {**m, "type": property_type, "source": "Property Monitor (mock)"}

def _yield_mock(area: str) -> dict:
    return {"area": area, "gross_yield": 7.2, "net_yield": 5.4, "avg_rent": 120_000}
