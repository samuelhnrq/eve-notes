import { signIn } from "@/auth";

export function LoginButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("keycloak");
      }}
    >
      <button type="submit" className="btn">
        Sign in
      </button>
    </form>
  );
}
