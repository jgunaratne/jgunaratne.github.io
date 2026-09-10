#!/usr/bin/env python3
"""Static server with HTTP Range support.

python -m http.server answers a Range request with the whole file and a 200,
which browsers reject for media. GitHub Pages serves ranges, so the tests
need a server that behaves the same way or video loading cannot be tested.
"""
import functools
import http.server
import os
import re
import socketserver
import sys

RANGE_RE = re.compile(r'bytes=(\d*)-(\d*)')


class RangeHandler(http.server.SimpleHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'

    def send_head(self):
        header = self.headers.get('Range')
        if not header:
            return super().send_head()

        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()
        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404)
            return None

        size = os.fstat(f.fileno()).st_size
        match = RANGE_RE.match(header)
        if not match:
            f.close()
            self.send_error(400)
            return None

        start, end = match.group(1), match.group(2)
        if start == '':
            # suffix range: the last N bytes
            length = int(end or 0)
            start = max(0, size - length)
            end = size - 1
        else:
            start = int(start)
            end = int(end) if end else size - 1
        end = min(end, size - 1)
        if start > end:
            f.close()
            self.send_error(416)
            return None

        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length', str(end - start + 1))
        self.end_headers()
        f.seek(start)
        self.copied = end - start + 1
        return _Limited(f, end - start + 1)

    def end_headers(self):
        if 'Accept-Ranges' not in self._headers_buffer_names():
            self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

    def _headers_buffer_names(self):
        return [
            h.decode('latin-1').split(':')[0]
            for h in getattr(self, '_headers_buffer', [])
            if b':' in h
        ]

    def log_message(self, *args):
        pass


class _Limited:
    """File wrapper that yields at most `remaining` bytes to copyfile()."""

    def __init__(self, fileobj, remaining):
        self._f = fileobj
        self._remaining = remaining

    def read(self, amt=-1):
        if self._remaining <= 0:
            return b''
        if amt is None or amt < 0 or amt > self._remaining:
            amt = self._remaining
        data = self._f.read(amt)
        self._remaining -= len(data)
        return data

    def close(self):
        self._f.close()


class Server(socketserver.ThreadingTCPServer):
    daemon_threads = True
    allow_reuse_address = True

    def handle_error(self, request, client_address):
        # Browsers abort media transfers routinely (seeking, pausing, leaving
        # the page). That is not a server error worth a traceback.
        if not isinstance(sys.exc_info()[1], (ConnectionResetError, BrokenPipeError)):
            super().handle_error(request, client_address)


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    handler = functools.partial(RangeHandler, directory=os.getcwd())
    with Server(('', port), handler) as httpd:
        print(f'serving {os.getcwd()} on http://localhost:{port}', flush=True)
        httpd.serve_forever()


if __name__ == '__main__':
    main()
