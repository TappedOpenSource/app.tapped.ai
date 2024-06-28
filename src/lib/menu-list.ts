import {
  BarChart2,
  Bug,
  Handshake,
  Map,
  MessageCircle,
  ScanSearch,
  Settings,
  Theater,
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
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "dashboard",
          active: pathname.includes("/dashboard"),
          icon: Map,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "contents",
      menus: [
        {
          href: "/search",
          label: "search",
          active: pathname.includes("/search"),
          icon: ScanSearch,
          submenus: [],
        },
        {
          href: "/build_a_show",
          label: "build a show",
          active: pathname.includes("/build_a_show"),
          icon: Theater,
          submenus: [],
        },
        {
          href: "/charts",
          label: "charts",
          active: pathname.includes("/charts"),
          icon: BarChart2,
          submenus: [],
        },
        {
          href: "/compare",
          label: "compare",
          active: pathname.includes("/compare"),
          icon: Handshake,
          submenus: [],
        },
        {
          href: "/messages",
          label: "messages",
          active: pathname.includes("/messages"),
          icon: MessageCircle,
          submenus: [],
        },
        {
          href: "https://tapped.tolt.io",
          external: true,
          label: "join the team",
          active: pathname.includes("/affiliate"),
          icon: Handshake,
          submenus: [],
        },
        {
          href: "https://tapped.canny.io/ideas-bugs",
          external: true,
          label: "feedback",
          active: pathname.includes("/feedback"),
          icon: Bug,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "account",
      menus: [
        // {
        //   href: "/profile",
        //   label: "me",
        //   active: pathname.includes("/profile"),
        //   icon: Users,
        //   submenus: [],
        // },
        {
          href: "/settings",
          label: "settings",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
