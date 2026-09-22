"""Verify the portfolio's basic semantic and keyboard navigation markup."""

from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parents[1]
REQUIRED_IDS = {"main", "work", "experience", "about", "contact"}


class MarkupParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.errors = []
        self.ids = set()
        self.counts = {name: 0 for name in ("main", "h1", "header", "nav", "footer")}
        self.headings = []
        self.fragments = []
        self.skip_target = None

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if tag in self.counts:
            self.counts[tag] += 1

        element_id = attrs.get("id")
        if element_id:
            if element_id in self.ids:
                self.errors.append(f"duplicate id: {element_id}")
            self.ids.add(element_id)

        if tag.startswith("h") and tag[1:] in {"1", "2", "3", "4", "5", "6"}:
            self.headings.append(int(tag[1:]))

        if tag == "img" and not (attrs.get("alt") or "").strip():
            self.errors.append("image has missing or empty alt text")

        if tag != "a":
            return

        href = attrs.get("href") or ""
        if href.startswith("#"):
            self.fragments.append(unquote(href[1:]))
        if "skip-link" in (attrs.get("class") or "").split():
            self.skip_target = unquote(href[1:]) if href.startswith("#") else None

        if (attrs.get("target") or "").lower() == "_blank":
            rel = set((attrs.get("rel") or "").lower().split())
            if not {"noopener", "noreferrer"}.issubset(rel):
                self.errors.append(f"new-tab link lacks safe rel: {href}")

def main():
    parser = MarkupParser()
    try:
        parser.feed((ROOT / "index.html").read_text(encoding="utf-8"))
        parser.close()
    except OSError as exc:
        print(f"markup verification failed: {exc}", file=sys.stderr)
        return 1

    for name in ("main", "h1", "header", "nav", "footer"):
        if parser.counts[name] != 1:
            parser.errors.append(f"expected one {name}, found {parser.counts[name]}")
    for element_id in sorted(REQUIRED_IDS - parser.ids):
        parser.errors.append(f"missing required id: {element_id}")
    for fragment in parser.fragments:
        if fragment not in parser.ids:
            parser.errors.append(f"broken internal link: #{fragment}")
    if parser.skip_target != "main" or "main" not in parser.ids:
        parser.errors.append("skip link must target #main")
    if not parser.headings or parser.headings[0] != 1:
        parser.errors.append("first heading must be h1")
    for previous, current in zip(parser.headings, parser.headings[1:]):
        if current > previous + 1:
            parser.errors.append(f"heading jumps from h{previous} to h{current}")

    if parser.errors:
        print("markup verification failed:", file=sys.stderr)
        for error in parser.errors:
            print(f"- {error}", file=sys.stderr)
        return 1
    print("markup verification passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
