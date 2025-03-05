import { signOut } from "@/auth.ts";
import { cn } from "@/lib/cn";

export function LogoutButton({ className }: { className?: string }) {
  return (
    <form
      className={cn("inline-block", className)}
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="btn">
        Sign out
      </button>
    </form>
  );
}
