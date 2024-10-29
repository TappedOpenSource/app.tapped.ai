import {
  Bug,
  CodeXml,
  Gem,
  Handshake,
  LayoutPanelLeft,
  MessageCircle,
  ScanSearch,
  Settings,
  Theater,
  MapIcon,
} from "lucide-react";

type Submenu = {
  href: string;
  external?: boolean;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  external?: boolean;
  label: string;
  active: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  submenus: Submenu[];
  requireAuth?: boolean;
};

type Group = {
  groupLabel: string | null;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: null,
      menus: [
        {
          href: "/map",
          label: "map",
          active: pathname.includes("/map"),
          icon: MapIcon,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "tools",
      menus: [
        {
          href: "/dashboard",
          label: "dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutPanelLeft,
          submenus: [],
          requireAuth: true,
        },
        {
          href: "/search",
          label: "search",
          active: pathname.includes("/search"),
          icon: ScanSearch,
          submenus: [],
        },
        {
          href: "/venue_outreach",
          label: "venue outreach",
          active: pathname.includes("/venue_outreach"),
          icon: Theater,
          submenus: [],
        },
        {
          href: "/api",
          label: "api",
          active: pathname.includes("/api"),
          icon: CodeXml,
          submenus: [],
          requireAuth: true,
        },
      ],
    },
    {
      groupLabel: "account",
      menus: [
        {
          href: "/messages",
          label: "messages",
          active: pathname.includes("/messages"),
          icon: MessageCircle,
          submenus: [],
          requireAuth: true,
        },
        {
          href: "/billing",
          label: "billing",
          active: pathname.includes("/billing"),
          icon: Gem,
          submenus: [],
          requireAuth: true,
        },
        {
          href: "https://tapped.tolt.io",
          external: true,
          label: "join the team",
          active: pathname.includes("/affiliate"),
          icon: Handshake,
          submenus: [],
          requireAuth: true,
        },
        {
          href: "https://tapped.canny.io/ideas-bugs",
          external: true,
          label: "feedback",
          active: pathname.includes("/feedback"),
          icon: Bug,
          submenus: [],
          requireAuth: true,
        },
        {
          href: "/settings",
          label: "settings",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: [],
          requireAuth: true,
        },
      ],
    },
  ];
}
