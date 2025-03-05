from os import environ

from backend.schema import authors, notes

DOMAIN = {
  "authors": authors,
  "notes": notes,
}

URL_PREFIX = "api"
API_VERSION = "v1"
RESOURCE_METHODS = ["GET", "POST", "DELETE"]
ITEM_METHODS = ["GET", "PATCH", "PUT", "DELETE"]

MONGO_URI = environ.get(
  "MONGO_URI", "mongodb://root:toor@localhost:27017/?authSource=admin"
)
