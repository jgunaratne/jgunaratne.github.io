#!/usr/bin/env python3
"""Fail if any local src/href/url() in the site does not resolve on disk."""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
REF = re.compile(r'(?:src|href)="([^"]+)"')
CSS_URL = re.compile(r'url\(([^)]+)\)')
# Only the site's own files; dev tooling ships its own broken-looking HTML.
SKIP_DIRS = {'.git', 'node_modules', 'test-results', 'playwright-report'}

def main() -> int:
    broken = []
    files = [
        p
        for p in list(ROOT.rglob('*.html')) + list(ROOT.rglob('*.css'))
        if not SKIP_DIRS & set(p.parts)
    ]
    for path in files:
        text = path.read_text(encoding='utf-8')
        for ref in REF.findall(text) + CSS_URL.findall(text):
            ref = ref.strip('\'"').split('#')[0].split('?')[0]
            if not ref or ref.startswith(('http://', 'https://', 'mailto:', 'data:', 'about:')):
                continue
            target = ROOT / ref.lstrip('/') if ref.startswith('/') else path.parent / ref
            if not target.exists():
                broken.append(f'{path.relative_to(ROOT)} -> {ref}')

    if broken:
        print('Broken local references:', file=sys.stderr)
        for item in broken:
            print('  ' + item, file=sys.stderr)
        return 1
    print(f'All local references resolve ({len(files)} files checked).')
    return 0

if __name__ == '__main__':
    sys.exit(main())
