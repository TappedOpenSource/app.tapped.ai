import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import SearchToggle from "./search-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="supports-backdrop-blur:bg-background/60 dark:shadow-secondary bg-background/95 sticky top-0 z-10 w-full shadow backdrop-blur">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center">
          <SheetMenu />
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="bg-border mx-2 h-4 w-[1px] shrink-0"
          />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <ModeToggle />
          <SearchToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
