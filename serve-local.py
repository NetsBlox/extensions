from http.server import HTTPServer, SimpleHTTPRequestHandler, test
import argparse

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-p', '--port', type = int, default = 8000)
    args = parser.parse_args()

    test(CORSRequestHandler, HTTPServer, port = args.port)
