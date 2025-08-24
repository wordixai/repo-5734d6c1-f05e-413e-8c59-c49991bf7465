import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Bookings from "./pages/Bookings";
import Galleries from "./pages/Galleries";
import Packages from "./pages/Packages";
import Referrals from "./pages/Referrals";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AppSidebar from "./components/AppSidebar";
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SidebarProvider>
        <div className="flex min-h-screen bg-gradient-to-br from-background to-muted/20">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/galleries" element={<Galleries />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/referrals" element={<Referrals />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
        <Toaster />
      </SidebarProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;