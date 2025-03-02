authors = {
  "resource_methods": ["GET"],
  "item_methods": ["GET"],
  "schema": {
    "name": {"type": "string", "required": True},
    "email": {"type": "string", "required": True, "unique": True},
  },
  "mongo_indexes": {
    "email": [("email", 1)],
  },
}
