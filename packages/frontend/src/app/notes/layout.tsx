import Sidebar from "@/components/Sidebar";
import type { PropsWithChildren } from "react";

async function HomeIndex({ children }: PropsWithChildren<{}>) {
  return (
    <div className="grow flex">
      <Sidebar className="basis-xs" />
      <div className="flex flex-1">{children}</div>
    </div>
  );
}

export default HomeIndex;
