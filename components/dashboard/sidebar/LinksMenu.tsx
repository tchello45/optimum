import {
  SidebarGroup,
  SidebarMenu,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Icon } from "@iconify/react";
import { useRouter, usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/dashboard",
    icon: "mdi:home",
  },
  {
    name: "AI",
    href: "/dashboard/ai",
    icon: "mdi:robot",
  },
  {
    name: "Chat",
    href: "/dashboard/chat",
    icon: "mdi:chat",
  },
];

export default function LinksMenu() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Links</SidebarGroupLabel>
      <SidebarMenu>
        {links.map(({ name, href, icon }) => (
          <SidebarMenuItem key={name}>
            <SidebarMenuButton
              isActive={pathname === href}
              onClick={() => router.push(href)}
              className="cursor-pointer"
            >
              <Icon icon={icon} className="w-6 h-6 mr-2" />
              <span>{name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
