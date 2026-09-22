"""Check published portfolio copy, local assets, and the downloadable resume.

Run from anywhere with ``python3 scripts/verify_content.py``. PDF text extraction
uses either PyPDF2 or pypdf; install one if neither is available.
"""

from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
EMAIL = "jmakwana@cs.cmu.edu"
REQUIRED_HTML = ("150+", "3.5x", "six engineers", "control-panel", EMAIL)
REQUIRED_FONTS = (
    "aktiv-grotesk-regular.otf",
    "aktiv-grotesk-bold.otf",
    "mont-black.ttf",
)
REQUIRED_IMAGES = ("portrait.jpg", "boxmate-product.webp", "embedded-systems.webp")


def extract_pdf_text(path: Path) -> str:
    try:
        from pypdf import PdfReader
    except ImportError:
        try:
            from PyPDF2 import PdfReader
        except ImportError as exc:
            raise RuntimeError("PDF text extraction needs PyPDF2 or pypdf") from exc
    return "\n".join(page.extract_text() or "" for page in PdfReader(str(path)).pages)


def main() -> int:
    errors = []
    try:
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        css = (ROOT / "style.css").read_text(encoding="utf-8")
        pdf = extract_pdf_text(ROOT / "Jenil-resume.pdf")
    except (OSError, RuntimeError, ValueError) as exc:
        print(f"content verification failed: {exc}", file=sys.stderr)
        return 1

    for name, content in (("index.html", html), ("style.css", css), ("Jenil-resume.pdf", pdf)):
        for banned in ("jmakwana@wisc.edu", "Unviersity", "\u2014"):
            if banned.lower() in content.lower():
                errors.append(f"{name}: outdated or banned text {banned!r}")

    for value in REQUIRED_HTML:
        if value.lower() not in html.lower():
            errors.append(f"index.html: missing required content {value!r}")
    if EMAIL not in pdf:
        errors.append(f"Jenil-resume.pdf: missing {EMAIL}")

    for name in REQUIRED_FONTS:
        if not (ROOT / "assets" / "fonts" / name).is_file():
            errors.append(f"assets/fonts/{name}: missing local font")
    for name in REQUIRED_IMAGES:
        if not (ROOT / "assets" / "images" / name).is_file():
            errors.append(f"assets/images/{name}: missing local image")
    if re.search(r"@import|fonts\.googleapis\.com|fonts\.gstatic\.com", html + css, flags=re.I):
        errors.append("page: remote font import found")

    if errors:
        print("content verification failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1
    print("content verification passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
