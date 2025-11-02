import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import DoctorInformation from "./pages/DoctorInformation";
import Specialty from "./pages/Specialty";
import Disease from "./pages/Disease";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Certification from "./pages/Certification";
import Membership from "./pages/Membership";
import Awards from "./pages/Awards";
import VideoPage from "./pages/VideoPage";
import ConsultationLocation from "./pages/ConsultationLocation";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DoctorInformation />} />
            <Route path="/specialty" element={<Specialty />} />
            <Route path="/disease" element={<Disease />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/certification" element={<Certification />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/consultation-location" element={<ConsultationLocation />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
