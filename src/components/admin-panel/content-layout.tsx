import { Navbar } from "@/components/admin-panel/navbar";
import { cn } from "@/lib/utils";

interface ContentLayoutProps {
  title: string;
  noPadding?: boolean;
  children: React.ReactNode;
}

export function ContentLayout({ title, children, noPadding = false }: ContentLayoutProps) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar title={title} />
      <div className={cn("flex flex-col grow", noPadding ? "" : "pt-8 pb-8 px-4 sm:px-8")}>{children}</div>
    </div>
  );
}
