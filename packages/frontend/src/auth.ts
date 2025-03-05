import NextAuth from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import Keycloak from "next-auth/providers/keycloak";

declare module "next-auth" {
  interface Session {
    accessToken: string;
  }
}

declare module "@auth/core/jwt" {
  interface DefaultJWT {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Keycloak],
  session: {
    strategy: "jwt",
    updateAge: 250,
  },
  callbacks: {
    async jwt({ token, account }): Promise<DefaultJWT> {
      if (account && !token.expiresAt) {
        // First-time login, save the `access_token`, its expiry and the `refresh_token`
        if (!account.access_token) {
          throw new TypeError("Missing access_token");
        }
        if (!account.refresh_token) {
          throw new TypeError("Missing refresh_token");
        }
        if (!account.expires_at) {
          throw new TypeError("Missing expires_at");
        }
        return {
          ...token,
          accessToken: account.access_token,
          expiresAt: account.expires_at,
          refreshToken: account.refresh_token,
        };
      } else if (Date.now() < token.expiresAt * 1000) {
        // Subsequent logins, but the `access_token` is still valid
        return token;
      } else {
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refreshToken) throw new TypeError("Missing refresh_token");

        try {
          // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
          // at their `/.well-known/openid-configuration` endpoint.
          // i.e. https://accounts.google.com/.well-known/openid-configuration
          const response = await fetch(
            `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
            {
              method: "POST",
              body: new URLSearchParams({
                client_id: process.env.AUTH_KEYCLOAK_ID!,
                client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
              }),
            },
          );

          const tokens = await response.json();

          if (!response.ok) throw tokens;
          if (!tokens.access_token) throw tokens;

          return {
            ...token,
            accessToken: tokens.access_token,
            expiresAt: Math.floor(Date.now() / 1000 + tokens.expires_in),
            // Some providers only issue refresh tokens once, so preserve if we did not get a new one
            refreshToken: tokens.refresh_token || token.refreshToken,
          };
        } catch (error) {
          console.error("Error refreshing access_token", error);
          // If we fail to refresh the token, return an error so we can handle it on the page
          token.error = "RefreshTokenError";
          return token;
        }
      }
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
