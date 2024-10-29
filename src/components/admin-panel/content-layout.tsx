import { Navbar } from "@/components/admin-panel/navbar";
import { cn } from "@/lib/utils";

interface ContentLayoutProps {
  title: string;
  noPadding?: boolean;
  children: React.ReactNode;
}

export function ContentLayout({
  title,
  children,
  noPadding = false,
}: ContentLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar title={title} />
      <div
        className={cn(
          "flex grow flex-col",
          noPadding ? "" : "px-4 pb-8 pt-8 sm:px-8"
        )}
      >
        {children}
      </div>
    </div>
  );
}
