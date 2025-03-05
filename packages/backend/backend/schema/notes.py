notes = {
  # "authentication": NotesAuth,
  "auth_field": "author",
  "item_title": "note",
  "versioning": True,
  "schema": {
    "title": {"type": "string", "required": True},
    "body": {"type": "string", "required": True},
    "author": {
      "type": "objectid",
      # "required": True,
      "data_relation": {"resource": "authors", "field": "_id"},
    },
  },
}
