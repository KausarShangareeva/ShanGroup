"""
designerBot — Генератор обложек.
Создаёт изображение по теме статьи через Stability AI,
загружает его на Cloudinary и возвращает публичный URL.
"""
import base64
import requests
import cloudinary
import cloudinary.uploader
from config import (
    STABILITY_API_KEY,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
)

# Инициализация Cloudinary
cloudinary.config(
    cloud_name = CLOUDINARY_CLOUD_NAME,
    api_key    = CLOUDINARY_API_KEY,
    api_secret = CLOUDINARY_API_SECRET,
)

STYLE_SUFFIX = (
    "architectural visualization, Dubai skyline, golden hour light, "
    "luxury real estate photography, cinematic, 8k, photorealistic"
)

NEGATIVE_PROMPT = (
    "text, watermark, logo, ugly, blurry, low quality, cartoon, "
    "anime, distorted, oversaturated"
)


def _build_image_prompt(title: str, category: str) -> str:
    """Строит промпт для Stability AI на основе заголовка статьи."""
    category_hints = {
        "Инвестиции": "Dubai financial district, glass towers, investment concept",
        "Виза":       "Dubai passport office, UAE flag, official documents",
        "Продажа":    "luxury Dubai apartment interior, floor-to-ceiling windows",
        "Рынок":      "Dubai skyline panorama, Burj Khalifa, modern architecture",
        "Аналитика":  "Dubai Marina aerial view, data visualization, charts overlay",
        "Новости":    "Dubai cityscape, breaking news style, modern buildings",
    }
    hint = category_hints.get(category, "Dubai modern real estate")
    return f"{hint}, {STYLE_SUFFIX}"


def generate_cover(article: dict) -> str:
    """
    Генерирует обложку для статьи.

    Args:
        article: словарь статьи от writerBot (нужны title, slug, category)

    Returns:
        Cloudinary URL изображения или пустую строку при ошибке
    """
    title    = article.get("title", "Dubai Real Estate")
    slug     = article.get("slug", "article")
    category = article.get("category", "Рынок")

    print(f"[designerBot] Generating image for: {slug}")

    prompt = _build_image_prompt(title, category)
    image_bytes = _call_stability(prompt)

    if not image_bytes:
        print("[designerBot] Image generation failed, skipping cover.")
        return ""

    url = _upload_to_cloudinary(image_bytes, slug)
    print(f"[designerBot] Cover uploaded: {url}")
    return url


def _call_stability(prompt: str) -> bytes | None:
    """
    Обращается к Stability AI API (SDXL).
    Документация: https://platform.stability.ai/docs/api-reference
    """
    if not STABILITY_API_KEY:
        print("[designerBot] STABILITY_API_KEY not set.")
        return None

    try:
        resp = requests.post(
            "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
            headers={
                "Authorization": f"Bearer {STABILITY_API_KEY}",
                "Content-Type":  "application/json",
                "Accept":        "application/json",
            },
            json={
                "text_prompts": [
                    {"text": prompt,         "weight": 1.0},
                    {"text": NEGATIVE_PROMPT, "weight": -1.0},
                ],
                "cfg_scale":   7,
                "height":      768,
                "width":       1344,   # ~16:9
                "samples":     1,
                "steps":       30,
            },
            timeout=60,
        )
        resp.raise_for_status()
        b64 = resp.json()["artifacts"][0]["base64"]
        return base64.b64decode(b64)

    except Exception as e:
        print(f"[designerBot] Stability AI error: {e}")
        return None


def _upload_to_cloudinary(image_bytes: bytes, slug: str) -> str:
    """Загружает изображение на Cloudinary и возвращает URL с auto-качеством."""
    try:
        result = cloudinary.uploader.upload(
            image_bytes,
            public_id = f"blog/{slug}",
            folder    = "shangroup",
            overwrite = True,
            resource_type = "image",
        )
        # Применяем авто-оптимизацию как на остальных картинках сайта
        url = result["secure_url"].replace(
            "/upload/", "/upload/q_auto/f_auto/"
        )
        return url

    except Exception as e:
        print(f"[designerBot] Cloudinary upload error: {e}")
        return ""
