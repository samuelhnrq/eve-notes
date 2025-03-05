from datetime import datetime

from eve.auth import TokenAuth
from flask import current_app as app
from httpx import get
from jose import JWTError, backends, jwk, jwt

_JWK: backends.base.Key = None


def _load_jwks():
  global _JWK
  if _JWK is not None:
    return _JWK
  jwks = get(app.config["JWT_JWKS_URL"]).json()
  jwks = [jwk for jwk in jwks["keys"] if jwk["use"] == "sig"]
  if len(jwks) == 0:
    raise JWTError("No usable keys found in JWKS")
  if len(jwks) > 1:
    raise JWTError("Multiple usable keys found in JWKS")
  key = jwk.construct(jwks[0])
  _JWK = key
  return key


class JWTAuth(TokenAuth):
  def check_auth(self, token, allowed_roles, resource, method):
    jwk = _load_jwks()
    try:
      token = jwt.decode(token, jwk, audience="account")
    except JWTError as e:
      app.logger.error("JWT error: %s", e)
      return False
    authors = app.data.driver.db["authors"]
    user = authors.find_one({"email": token["email"]})
    if not user:
      app.logger.info("Inserting author")
      user = {
        "email": token["email"],
        "name": token["name"],
        "_created": datetime.now(),
        "_updated": datetime.now(),
      }
      authors.insert_one(user)
    self.set_user_or_token(user)
    self.set_request_auth_value(user["_id"])
    return True
