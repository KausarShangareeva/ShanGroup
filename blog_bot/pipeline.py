"""
pipeline.py — Главный оркестратор.

Использование:
    # Одна статья
    python pipeline.py write --topic "Почему растут цены на виллы" --publish

    # Пакет статей из файла
    python pipeline.py batch --topics topics.txt --publish

    # Доработать статью
    python pipeline.py refine --file output/article.json --feedback "сделай вывод короче"
"""
import argparse
import json
import os
import time
from pathlib import Path

import analyst_bot
import writer_bot
import designer_bot
from config import BLOG_JSON_PATH, OUTPUT_DIR


# ── Одна статья ───────────────────────────────────────────────────────────────

def run(
    topic: str,
    areas: list[str] | None = None,
    extra_context: str = "",
    generate_image: bool = True,
    save_to_blog: bool = False,
) -> dict:
    print(f"\n{'='*55}")
    print(f"  ShanGroup Blog Bot")
    print(f"  Тема: {topic}")
    print(f"{'='*55}\n")

    market_data = analyst_bot.collect_market_data(topic, areas)
    article     = writer_bot.write_article(market_data, topic, extra_context)

    if generate_image:
        article["img"] = designer_bot.generate_cover(article)

    _save_to_output(article)

    if save_to_blog:
        _publish_to_blog(article)

    print(f"\n✓ Готово: «{article['title']}»")
    return article


# ── Пакетный режим ────────────────────────────────────────────────────────────

def batch(
    topics_file: str,
    generate_image: bool = True,
    save_to_blog: bool = False,
    delay: int = 5,
) -> list[dict]:
    """
    Читает темы из файла (одна строка = одна тема) и пишет статьи подряд.

    Формат topics.txt:
        Почему цены на виллы растут в 2026
        Золотая виза ОАЭ: полный гид
        # Строки с # — комментарии, пропускаются

    Args:
        topics_file:    путь к .txt файлу с темами
        generate_image: генерировать обложки
        save_to_blog:   публиковать в blog.json
        delay:          пауза между статьями в секундах (защита от rate limit)
    """
    topics = _load_topics(topics_file)

    if not topics:
        print("[batch] Файл пустой или не найден.")
        return []

    total   = len(topics)
    done    = []
    failed  = []

    print(f"\n{'='*55}")
    print(f"  Batch режим: {total} статей")
    print(f"  Публикация: {'да' if save_to_blog else 'нет'}")
    print(f"  Картинки:   {'да' if generate_image else 'нет'}")
    print(f"{'='*55}")

    for i, topic in enumerate(topics, 1):
        print(f"\n[{i}/{total}] {topic}")

        try:
            article = run(
                topic          = topic,
                generate_image = generate_image,
                save_to_blog   = save_to_blog,
            )
            done.append(article["title"])

        except Exception as e:
            print(f"  ✗ Ошибка: {e}")
            failed.append(topic)

        # Пауза между запросами чтобы не превысить rate limit
        if i < total:
            print(f"  ... пауза {delay} сек")
            time.sleep(delay)

    # Итог
    print(f"\n{'='*55}")
    print(f"  Готово: {len(done)}/{total}")
    if failed:
        print(f"  Ошибки ({len(failed)}):")
        for t in failed:
            print(f"    - {t}")
    print(f"{'='*55}\n")

    return done


def _load_topics(path: str) -> list[str]:
    """Читает темы из файла, пропускает комментарии и пустые строки."""
    try:
        with open(path, encoding="utf-8") as f:
            lines = f.readlines()
        return [
            l.strip() for l in lines
            if l.strip() and not l.strip().startswith("#")
        ]
    except FileNotFoundError:
        print(f"[batch] Файл не найден: {path}")
        return []


# ── Доработка статьи ──────────────────────────────────────────────────────────

def refine(article_path: str, feedback: str) -> dict:
    with open(article_path, encoding="utf-8") as f:
        article = json.load(f)

    refined = writer_bot.refine_article(article, feedback)
    _save_to_output(refined)
    return refined


# ── Вспомогательные ───────────────────────────────────────────────────────────

def _save_to_output(article: dict) -> None:
    Path(OUTPUT_DIR).mkdir(exist_ok=True)
    slug = article.get("slug", f"article_{article['id']}")
    path = os.path.join(OUTPUT_DIR, f"{slug}.json")

    with open(path, "w", encoding="utf-8") as f:
        json.dump(article, f, ensure_ascii=False, indent=2)

    print(f"[pipeline] Saved → {path}")


def _publish_to_blog(article: dict) -> None:
    blog_path = Path(BLOG_JSON_PATH)

    posts = []
    if blog_path.exists():
        with open(blog_path, encoding="utf-8") as f:
            posts = json.load(f)

    card = {
        "id":       article["id"],
        "slug":     article["slug"],
        "category": article["category"],
        "title":    article["title"],
        "excerpt":  article["excerpt"],
        "author":   article["author"],
        "role":     article["role"],
        "avatar":   article["avatar"],
        "date":     article["date"],
        "readTime": article["readTime"],
        "img":      article["img"],
    }

    posts.insert(0, card)

    with open(blog_path, "w", encoding="utf-8") as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print(f"[pipeline] Published to {blog_path}")


# ── CLI ───────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="ShanGroup Blog Bot")
    sub    = parser.add_subparsers(dest="command")

    # write
    w = sub.add_parser("write", help="Написать одну статью")
    w.add_argument("--topic",    required=True)
    w.add_argument("--areas",    default="")
    w.add_argument("--context",  default="")
    w.add_argument("--no-image", action="store_true")
    w.add_argument("--publish",  action="store_true")

    # batch
    b = sub.add_parser("batch", help="Написать статьи из файла с темами")
    b.add_argument("--topics",   required=True, help="Путь к .txt файлу с темами")
    b.add_argument("--no-image", action="store_true")
    b.add_argument("--publish",  action="store_true")
    b.add_argument("--delay",    type=int, default=5, help="Пауза между статьями (сек)")

    # refine
    r = sub.add_parser("refine", help="Доработать статью")
    r.add_argument("--file",     required=True)
    r.add_argument("--feedback", required=True)

    args = parser.parse_args()

    if args.command == "write":
        areas = [a.strip() for a in args.areas.split(",")] if args.areas else None
        run(
            topic          = args.topic,
            areas          = areas,
            extra_context  = args.context,
            generate_image = not args.no_image,
            save_to_blog   = args.publish,
        )

    elif args.command == "batch":
        batch(
            topics_file    = args.topics,
            generate_image = not args.no_image,
            save_to_blog   = args.publish,
            delay          = args.delay,
        )

    elif args.command == "refine":
        refine(args.file, args.feedback)

    else:
        parser.print_help()
