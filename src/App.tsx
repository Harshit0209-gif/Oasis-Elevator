import { Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrganizationJsonLd } from "@/lib/seo";
import { ScrollToTop } from "./ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { ProductsPage } from "./pages/ProductsPage";
import { IndustriesPage } from "./pages/IndustriesPage";
import { ClientsPage } from "./pages/ClientsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <OrganizationJsonLd />
      <SmoothScrollProvider>
        <ScrollToTop />
        <LoadingScreen />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
