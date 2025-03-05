import { auth } from "@/auth";
import ky from "ky";

export const client = ky.extend({
  prefixUrl: process.env.BACKEND_URL,
  hooks: {
    beforeRequest: [
      async (req) => {
        if (req.headers.has("authorization")) {
          return;
        }
        const user = await auth();
        req.headers.set("authorization", `Bearer ${user?.accessToken}`);
      },
    ],
  },
});
