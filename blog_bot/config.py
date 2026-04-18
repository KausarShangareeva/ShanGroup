"""
Конфигурация бота. Все ключи — через переменные среды (.env).
"""
import os
from dotenv import load_dotenv

load_dotenv()

# ── Claude API ──────────────────────────────────────────────
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
CLAUDE_MODEL = "claude-opus-4-6"          # самая мощная модель для текста

# ── Изображения (Stability AI) ──────────────────────────────
STABILITY_API_KEY = os.getenv("STABILITY_API_KEY")

# ── Cloudinary (загрузка обложек) ───────────────────────────
CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
CLOUDINARY_API_KEY    = os.getenv("CLOUDINARY_API_KEY")
CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

# ── DLD Open Data ───────────────────────────────────────────
# Бесплатный портал: https://dubailand.gov.ae/en/open-data/
DLD_BASE_URL = "https://services.dubailand.gov.ae/open-data/api"

# ── Property Monitor ────────────────────────────────────────
# Требует регистрации: https://propertymonitor.com/api
PROPERTY_MONITOR_API_KEY = os.getenv("PROPERTY_MONITOR_API_KEY")
PROPERTY_MONITOR_URL     = "https://api.propertymonitor.com/v1"

# ── Выходные файлы ───────────────────────────────────────────
OUTPUT_DIR     = "output"           # папка для готовых статей
BLOG_JSON_PATH = "../frontend/src/data/blog.json"   # путь к блогу фронта
