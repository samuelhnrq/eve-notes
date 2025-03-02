notes = {
  "schema": {
    "title": {"type": "string", "required": True},
    "body": {"type": "string", "required": True},
    "author": {"type": "data_relation", "required": True, "resource": "author"},
    "created_at": {"type": "datetime", "required": True},
    "updated_at": {"type": "datetime", "required": True},
  },
}
