"""Standard-library local-only assessment prototype runner. No external services."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from urllib.parse import unquote, urlsplit
from urllib.request import urlopen
from urllib.error import HTTPError
import sys

class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.mjs': 'text/javascript', '.js': 'text/javascript'}
    def do_GET(self):
        segments = unquote(urlsplit(self.path).path).replace('\\', '/').split('/')
        if any(segment.startswith('.') for segment in segments if segment):
            self.send_error(404)
            return
        if urlsplit(self.path).path == '/':
            self.send_response(302)
            self.send_header('Location', '/prototype/')
            self.end_headers()
            return
        super().do_GET()
    def do_HEAD(self):
        # Apply the same hidden-path restrictions as GET.
        self.do_GET()
    def list_directory(self, path):
        self.send_error(404, 'Directory listing disabled')
        return None
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'; form-action 'none'; base-uri 'none'")
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()

if __name__ == '__main__':
    check = '--check' in sys.argv
    server = ThreadingHTTPServer(('127.0.0.1', 0 if check else 8770), partial(Handler, directory=str(Path(__file__).resolve().parent)))
    if check:
        Thread(target=server.serve_forever, daemon=True).start()
        try:
            for asset in ('', 'prototype/', 'prototype/app.js', 'prototype/domain.mjs', 'prototype/ui.mjs', 'prototype/product.mjs', 'prototype/styles.css', 'prototype/assets/profile.svg', 'prototype/assets/john.svg', 'prototype/assets/maya.svg', 'prototype/assets/avery.svg', 'prototype/assets/sam.svg', 'prototype/assets/suncrest-network.svg', 'measurement/metrics.mjs', 'data/experiment.synthetic.json', 'directive.md'):
                with urlopen(f'http://127.0.0.1:{server.server_port}/{asset}', timeout=5) as response:
                    assert response.status == 200
                    assert response.read()
                    assert response.headers['Cache-Control'] == 'no-store'
                    print(f'PASS HTTP /{asset}', flush=True)
            for asset in ('.git/config', '%2Egit/config', 'data/'):
                try:
                    urlopen(f'http://127.0.0.1:{server.server_port}/{asset}', timeout=5)
                    raise AssertionError('Expected blocked path')
                except HTTPError as error:
                    assert error.code == 404
                    print(f'PASS blocked /{asset}', flush=True)
        finally:
            server.shutdown()
            server.server_close()
    else:
        print('Synthetic participation MVP: http://127.0.0.1:8770/prototype/', flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
        finally:
            server.server_close()
