import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import RiskManagement from "./pages/RiskManagement";
import ComplianceTracking from "./pages/ComplianceTracking";
import IncidentResponse from "./pages/IncidentResponse";
import VulnerabilityScanning from "./pages/VulnerabilityScanning";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-12 flex items-center border-b border-border bg-card px-4">
                <SidebarTrigger className="mr-4" />
                <h1 className="font-semibold text-foreground">GRC Management Platform</h1>
              </header>
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/risks" element={<RiskManagement />} />
                  <Route path="/compliance" element={<ComplianceTracking />} />
                  <Route path="/incidents" element={<IncidentResponse />} />
                  <Route path="/vulnerabilities" element={<VulnerabilityScanning />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
