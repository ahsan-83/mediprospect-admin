import { NavLink } from "react-router-dom";
import {
  User,
  Stethoscope,
  FileHeart,
  Briefcase,
  GraduationCap,
  Award,
  Users,
  Trophy,
  Video,
  MapPin,
  Phone,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Doctor Information", url: "/", icon: User },
  { title: "Specialty", url: "/specialty", icon: Stethoscope },
  { title: "Disease", url: "/disease", icon: FileHeart },
  { title: "Experience", url: "/experience", icon: Briefcase },
  { title: "Education", url: "/education", icon: GraduationCap },
  { title: "Certification", url: "/certification", icon: Award },
  { title: "Membership", url: "/membership", icon: Users },
  { title: "Awards", url: "/awards", icon: Trophy },
  { title: "Video", url: "/video", icon: Video },
  { title: "Consultation Location", url: "/consultation-location", icon: MapPin },
  { title: "Contact", url: "/contact", icon: Phone },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs uppercase tracking-wider px-3 py-2">
            {open ? "Admin Panel" : "Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
