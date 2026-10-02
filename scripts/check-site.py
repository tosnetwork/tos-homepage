#!/usr/bin/env python3
"""Validate public routes, fragments, assets, and complete language coverage."""
import argparse
import json
import subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent.parent


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()
        self.keys = set()
        self.headings = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if 'data-i18n' in attrs:
            self.keys.add(attrs['data-i18n'])
        if tag == 'h1':
            self.headings += 1
        self.links.extend(attrs[key] for key in ('href', 'src') if key in attrs)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--tos-root', type=Path, help='Also validate linked TOS source files')
    args = parser.parse_args()
    extraction = """const fs=require('fs'),vm=require('vm');
const source=fs.readFileSync(process.argv[1],'utf8');
const end=source.indexOf('var supported');
if(end<0)throw new Error('Translation boundary missing');
vm.runInNewContext(source.slice(0,end)+'console.log(JSON.stringify(translations));})();',{console});"""
    output = subprocess.check_output(['node', '-e', extraction, str(ROOT / 'js/i18n.js')], text=True)
    translations = json.loads(output)
    pages = {}
    for path in ROOT.glob('*.html'):
        page = Page()
        page.feed(path.read_text())
        pages[path.name] = page
    errors = []
    for filename, page in pages.items():
        if page.headings != 1:
            errors.append(f'{filename}: expected one H1, found {page.headings}')
        for language in ('zh', 'ja', 'ko'):
            missing = page.keys - translations[language].keys()
            if missing:
                errors.append(f'{filename} {language}: missing translations {sorted(missing)}')
        for link in page.links:
            url = urlparse(link)
            if url.scheme or url.netloc:
                prefix = 'https://github.com/tosnetwork/tos/blob/main/'
                if args.tos_root and link.startswith(prefix):
                    relative = link[len(prefix):]
                    if not (args.tos_root / relative).is_file():
                        errors.append(f'{filename}: missing TOS source {relative}')
                continue
            target = unquote(url.path) or filename
            if not (ROOT / target).exists():
                errors.append(f'{filename}: missing local file {target}')
            if url.fragment and target in pages and url.fragment not in pages[target].ids:
                errors.append(f'{filename}: missing anchor {target}#{url.fragment}')
            if target.startswith(('css/', 'js/')) and 'v=' not in url.query:
                errors.append(f'{filename}: asset lacks cache version {target}')
    if errors:
        raise SystemExit('\n'.join(errors))
    print(f'PASS: {len(pages)} pages; routes, fragments, assets, cache versions, and 3 language dictionaries')
    print(f'Translation keys per language: {len(translations["zh"])}')


if __name__ == '__main__':
    main()
