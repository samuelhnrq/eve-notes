import { auth } from "@/auth";
import ky from "ky";

async function HomeIndex() {
  const user = await auth();
  let resp: Record<string, string> = { not: "executed" };

  if (user) {
    try {
      resp = await ky
        .get(`http://localhost:5000/authors`, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
        .json();
    } catch (e) {
      resp = { error: `Error: ${e}` };
    }
  }

  return (
    <>
      <h1>token is: {JSON.stringify(resp)} </h1>
    </>
  );
}

export default HomeIndex;
