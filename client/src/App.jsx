import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MotionConfig } from "framer-motion";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import Layout from "./components/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Madrasha from "./pages/Madrasha.jsx";
import Notices from "./pages/Notices.jsx";

import Contact from "./pages/Contact.jsx";
import Donate from "./pages/Donate.jsx";
import DonateResult from "./pages/DonateResult.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminDonations from "./pages/admin/AdminDonations.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminNotices from "./pages/admin/AdminNotices.jsx";

import AdminMessages from "./pages/admin/AdminMessages.jsx";
import AdminSettings from "./pages/admin/AdminSettings.jsx";
import Gallery from "./pages/Gallery.jsx";
import AdminGallery from "./pages/admin/AdminGallery.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <AuthProvider>
          <SettingsProvider>
            <Toaster position="top-center" />
            <ScrollToTop />

            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="madrasha" element={<Madrasha />} />
                <Route path="notices" element={<Notices />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="contact" element={<Contact />} />
                <Route path="donate" element={<Donate />} />
                <Route path="donate/result" element={<DonateResult />} />
                <Route path="login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="dashboard" element={<Dashboard />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Route>

              <Route path="admin" element={<ProtectedRoute adminOnly />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="donations" element={<AdminDonations />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="notices" element={<AdminNotices />} />
                  <Route path="gallery" element={<AdminGallery />} />                  
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Route>
            </Routes>
          </SettingsProvider>
        </AuthProvider>
      </MotionConfig>
    </BrowserRouter>
  );
}
