import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Search, Bell, User, Menu, Home, Users, AlertTriangle, FlaskConical, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppLayoutProps {
  children: ReactNode;
  projectId?: string;
}

const AppLayout = ({ children, projectId }: AppLayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const projectNav = projectId ? [
    { name: "Overview", path: `/project/${projectId}`, icon: Home },
    { name: "Reconnaissance", path: `/project/${projectId}/recon`, icon: Users },
    { name: "Vulnerability Assessment", path: `/project/${projectId}/vulns`, icon: AlertTriangle },
    { name: "Post-Exploitation", path: `/project/${projectId}/postex`, icon: FlaskConical },
    { name: "Reports", path: `/project/${projectId}/reports`, icon: FileText },
    { name: "Settings", path: `/project/${projectId}/settings`, icon: Settings },
  ] : [];

  return (
    <div className="min-h-screen flex flex-col w-full dark">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card/95">
        <div className="container flex h-16 items-center px-6">
          <Link to="/" className="flex items-center space-x-3 mr-8">
            <Shield className="h-7 w-7 text-primary" />
            <span className="font-bold text-xl">OSIntric</span>
          </Link>

          <div className="flex-1 flex items-center space-x-4">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, findings, people..."
                className="pl-10 bg-muted/50"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Project Navigation */}
      {projectId && (
        <nav className="border-b bg-card">
          <div className="container px-6">
            <div className="flex space-x-1">
              {projectNav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant="ghost"
                      className={`rounded-none border-b-2 ${
                        isActive(item.path)
                          ? "border-primary text-primary"
                          : "border-transparent hover:border-muted-foreground/50"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1 container px-6 py-6">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
