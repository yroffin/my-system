"""Handlers module"""
import json

from tornado.web import RequestHandler

class BaseHandler(RequestHandler):
    """Application base handler"""

    def json_response(self, status, data):
        """Helper method for sending response containing json data
        """
        self.set_header("Content-Type", "application/json")
        self.set_status(status)
        self.write(json.dumps(data, default=str))
        self.finish()
