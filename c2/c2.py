from http.server import BaseHTTPRequestHandler, HTTPServer

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        message = "Get response."
        self.wfile.write(bytes(message, "utf8"))
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        message = "Post response."
        self.wfile.write(bytes(message, "utf8"))
        # print to stdout the post body containing profitz.
        print(self.rfile.read(int(self.headers['Content-Length'])))
        

with HTTPServer(('', 8080), handler) as server:
    server.serve_forever()