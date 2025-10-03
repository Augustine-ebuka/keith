import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./ui/sidebar";
import { Button } from "../components/ui/button";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Settings, 
  User,
  Home,
  ChevronRight,
  GitBranchIcon,
  NotebookPen,
  Slack,
  Bug
} from "lucide-react";


export function AppLayout({ children, currentPage, onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
      description: "Main workflow overview"
    },
    {
      id: "linear",
      title: "Linear Mapping",
      icon: GitBranchIcon,
      description: "Linear Walkflow"
    },
    {
      id: "slack",
      title: "Slack Mapping",
      icon: Slack,
      description: "Slack Walkflow"
    },
    {
      id: "feature",
      title: "Feature Report",
      icon: NotebookPen,
      description: "Report Features"
    },
    {
      id: "bug",
      title: "Bug Report",
      icon: Bug,
      description: "Report bug"
    },
  ];

  const allPages = [
    ...menuItems,
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
      description: "Application settings"
    },
  ];

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon" variant="sidebar">
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <LayoutDashboard className="size-4" />
              </div>
              <div className="group-data-[collapsible=icon]:hidden">
                <h1 className="font-semibold">Keith</h1>
                <p className="text-xs text-muted-foreground">SMC Issue Management</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="">
            <SidebarMenu className="">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={currentPage === item.id}
                    onClick={() => onNavigate(item.id)}
                    tooltip={item.description}
                    className=""
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-sidebar-border">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={currentPage === "settings"}
                  onClick={() => onNavigate("settings")}
                  tooltip="Settings"
                >
                  <Settings className="size-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="User Profile">
                  <User className="size-4" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Home className="size-4" />
              <ChevronRight className="size-4" />
              <span className="font-medium text-foreground">
                {allPages.find(item => item.id === currentPage)?.title || "Dashboard"}
              </span>
            </div>
          </header>
          
          <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}