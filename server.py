#!/usr/bin/env python3

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Set up the server
PORT = 8000
DIRECTORY = "."

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def guess_type(self, path):
        """Add proper MIME types for files"""
        if path.endswith('.html'):
            return 'text/html'
        elif path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.json'):
            return 'application/json'
        elif path.endswith('.png'):
            return 'image/png'
        elif path.endswith('.jpg') or path.endswith('.jpeg'):
            return 'image/jpeg'
        elif path.endswith('.gif'):
            return 'image/gif'
        elif path.endswith('.svg'):
            return 'image/svg+xml'
        else:
            return super().guess_type(path)

def start_server():
    """Start the local development server"""
    try:
        # Change to the correct directory
        os.chdir(DIRECTORY)
        
        # Create server
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"Starting CareerGuide Development Server...")
            print(f"Server running at: http://localhost:{PORT}")
            print(f"Serving directory: {os.path.abspath(DIRECTORY)}")
            print("Press Ctrl+C to stop the server")
            print("=" * 50)
            
            # Open browser automatically
            webbrowser.open(f'http://localhost:{PORT}')
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except Exception as e:
        print(f"Error starting server: {e}")

if __name__ == "__main__":
    start_server()
