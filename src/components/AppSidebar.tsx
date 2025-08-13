import { 
  LayoutDashboard, 
  Shield, 
  CheckSquare, 
  AlertTriangle, 
  Search,
  FileText,
  Settings,
  BarChart3
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Risk Management", url: "/risks", icon: Shield },
  { title: "Compliance", url: "/compliance", icon: CheckSquare },
  { title: "Incidents", url: "/incidents", icon: AlertTriangle },
  { title: "Vulnerabilities", url: "/vulnerabilities", icon: Search },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const settingsItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => {
    return isActive(path) 
      ? "bg-accent text-accent-foreground font-medium" 
      : "hover:bg-muted/50";
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64 animate-slide-in-right"} collapsible="icon">
      <SidebarHeader className="border-b border-border p-4 animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center hover-glow">
            <Shield className="h-5 w-5 text-primary-foreground animate-glow-pulse" />
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold">GRC Platform</h2>
              <p className="text-xs text-muted-foreground">Governance, Risk & Compliance</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="animate-fade-in">
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={`${getNavClass(item.url)} hover-scale hover-glow`}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-fade-in" style={{ animationDelay: `${(navigationItems.length + index) * 0.1}s` }}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={`${getNavClass(item.url)} hover-scale hover-glow`}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
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