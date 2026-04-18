"""
writerBot — Автор статей.
Получает рыночные данные от analystBot,
пишет SEO-оптимизированную статью через Claude API,
возвращает готовый объект для blog.json.
"""
import json
import re
import anthropic
from datetime import datetime
from config import ANTHROPIC_API_KEY, CLAUDE_MODEL

client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

SYSTEM_PROMPT = """Ты — старший аналитик рынка недвижимости ОАЭ из компании ShanGroup (Дубай).
Ты пишешь экспертные статьи для русскоязычной аудитории: инвесторов, эмигрантов и покупателей.

Правила письма:
- Тон: профессиональный, но живой. Не сухой отчёт, а разговор с умным другом.
- Всегда опирайся на конкретные цифры из предоставленных данных.
- Структура: введение → 3-4 раздела с H2 заголовками → вывод с призывом к действию.
- В конце добавь раздел "Ключевые выводы" — 3 пункта маркированным списком.
- SEO: используй ключевые слова естественно, не спамь.
- Длина: 600-900 слов. Не больше.
- Формат ответа: строго JSON (см. схему ниже).
- Язык: русский.

Застройщики которых стоит упомянуть при уместности: Emaar, DAMAC, Sobha, Nakheel, Binghatti.
"""

ARTICLE_SCHEMA = """
Верни ТОЛЬКО валидный JSON без markdown-обёртки:
{
  "title":    "заголовок статьи (до 80 символов)",
  "slug":     "url-slug-na-latinice",
  "category": "одна из: Инвестиции | Виза | Продажа | Рынок | Аналитика | Новости",
  "excerpt":  "краткое описание 1-2 предложения (до 180 символов)",
  "body":     "полный текст статьи в Markdown",
  "seo": {
    "metaTitle":       "SEO заголовок до 60 символов",
    "metaDescription": "SEO описание до 155 символов",
    "keywords":        ["слово1", "слово2", "слово3", "слово4", "слово5"]
  },
  "readTime": "X мин"
}
"""


def _build_user_prompt(market_data: dict, topic: str, extra_context: str = "") -> str:
    """Формирует промпт с данными для Claude."""
    data_str = json.dumps(market_data, ensure_ascii=False, indent=2)

    return f"""Напиши статью на тему: «{topic}»

Рыночные данные для использования в статье:
```json
{data_str}
```

{extra_context}

{ARTICLE_SCHEMA}
"""


def write_article(market_data: dict, topic: str, extra_context: str = "") -> dict:
    """
    Основная функция. Отправляет данные в Claude, получает готовую статью.

    Args:
        market_data:   словарь от analystBot.collect_market_data()
        topic:         тема статьи (например "Почему цены на виллы растут в 2026")
        extra_context: дополнительные инструкции (опционально)

    Returns:
        dict с полями title, slug, category, excerpt, body, seo, readTime
    """
    print(f"[writerBot] Writing article: {topic}")

    prompt = _build_user_prompt(market_data, topic, extra_context)

    message = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=4096,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    )

    raw = message.content[0].text.strip()

    # Убираем markdown-обёртку если Claude всё же добавил её
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)

    article = json.loads(raw)

    # Добавляем мета-поля
    article["id"]    = int(datetime.now().timestamp())
    article["date"]  = datetime.now().strftime("%-d %b %Y")   # "7 апр 2026"
    article["author"] = "ShanGroup Analytics"
    article["role"]   = "Аналитический отдел"
    article["avatar"] = "https://res.cloudinary.com/dxp7ppipg/image/upload/shangroup-logo.png"
    article["img"]    = ""   # заполнит designerBot

    print(f"[writerBot] Done: «{article['title']}»")
    return article


def refine_article(article: dict, feedback: str) -> dict:
    """
    Доработка уже написанной статьи по замечаниям.
    Используется для ручных правок без полного перегенерирования.
    """
    print("[writerBot] Refining article...")

    prompt = f"""Вот статья:
```json
{json.dumps(article, ensure_ascii=False, indent=2)}
```

Замечания для исправления: {feedback}

Верни исправленную статью в том же JSON формате."""

    message = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=4096,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    )

    raw = message.content[0].text.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)

    refined = json.loads(raw)
    refined["id"]     = article["id"]
    refined["date"]   = article["date"]
    refined["author"] = article["author"]
    refined["role"]   = article["role"]
    refined["avatar"] = article["avatar"]
    refined["img"]    = article.get("img", "")

    print("[writerBot] Refinement done.")
    return refined
