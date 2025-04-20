
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "@/contexts/DataContext";
import NavBar from "@/components/NavBar";
import Index from "./pages/Index";
import CourseTypes from "./pages/CourseTypes";
import Courses from "./pages/Courses";
import Offerings from "./pages/Offerings";
import Registrations from "./pages/Registrations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NavBar />
          <div className="mt-4 mb-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/course-types" element={<CourseTypes />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/offerings" element={<Offerings />} />
              <Route path="/registrations" element={<Registrations />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
