import { Navbar } from "@/components/admin-panel/navbar";
import { cn } from "@/lib/utils";

interface ContentLayoutProps {
  title: string;
  noPadding?: boolean;
  children: React.ReactNode;
}

export function ContentLayout({ title, children, noPadding = false }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className={cn("container", noPadding ? "" : "pt-8 pb-8 px-4 sm:px-8")}>{children}</div>
    </div>
  );
}
