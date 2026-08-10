import { Route, Routes } from "react-router-dom";
import { AdminAuthProvider } from "./useAdminAuth";
import { RequireAdmin } from "./RequireAdmin";
import { AdminLayout } from "./AdminLayout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HeroEditor } from "./pages/HeroEditor";
import { AboutEditor } from "./pages/AboutEditor";
import { FooterEditor } from "./pages/FooterEditor";
import { SettingsEditor } from "./pages/SettingsEditor";
import { SeoEditor } from "./pages/SeoEditor";
import { NavigationEditor } from "./pages/NavigationEditor";
import { MediaLibraryPage } from "./pages/MediaLibraryPage";
import { CollectionPage } from "./components/CollectionPage";
import { collections } from "./config/collections";

export function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="hero" element={<HeroEditor />} />
          <Route path="about" element={<AboutEditor />} />
          <Route path="footer" element={<FooterEditor />} />
          <Route path="settings" element={<SettingsEditor />} />
          <Route path="seo" element={<SeoEditor />} />
          <Route path="navigation" element={<NavigationEditor />} />
          <Route path="media" element={<MediaLibraryPage />} />
          <Route path="why-oasis" element={<CollectionPage config={collections.whyOasis} />} />
          <Route path="products" element={<CollectionPage config={collections.products} />} />
          <Route path="services" element={<CollectionPage config={collections.services} />} />
          <Route path="industries" element={<CollectionPage config={collections.industries} />} />
          <Route path="process" element={<CollectionPage config={collections.process} />} />
          <Route path="projects" element={<CollectionPage config={collections.projects} />} />
          <Route path="clients" element={<CollectionPage config={collections.clients} />} />
          <Route path="testimonials" element={<CollectionPage config={collections.testimonials} />} />
          <Route path="statistics" element={<CollectionPage config={collections.statistics} />} />
          <Route path="certifications" element={<CollectionPage config={collections.certifications} />} />
          <Route path="faqs" element={<CollectionPage config={collections.faqs} />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}
