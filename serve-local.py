from http.server import HTTPServer, SimpleHTTPRequestHandler, test

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    test(CORSRequestHandler, HTTPServer)
