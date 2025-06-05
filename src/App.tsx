import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import EligibilityPage from "./pages/EligibilityPage";
import ReportPage from "./pages/ReportPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsPage from "./pages/TermsPage";
import LegalPage from "./pages/LegalPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/navigation/ScrollToTop";
import CookieConsentBanner from "./components/layout/CookieConsentBanner";
import "./App.css";
import AppointmentPage from "./pages/AppointmentPage";
import AccessRequestsPage from "./pages/AccessRequestsPage";
import DashboardPage from "./pages/DashboardPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import { ChatProvider } from "./components/providers/ChatProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from "./pages/NotFound";

// Composant pour gérer le scroll au changement de route
const ScrollToTopOnMount = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ChatProvider>
        <ScrollToTopOnMount />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Protected dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/start" element={<EligibilityPage />} />
              <Route path="/report/:id" element={<ReportPage />} />
              <Route
                path="/report/details/:id"
                element={<ReportDetailPage />}
              />
              <Route path="/appointment" element={<AppointmentPage />} />
              <Route path="/access" element={<AccessRequestsPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/mentions-legales" element={<LegalPage />} />
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
          <CookieConsentBanner />
        </div>
      </ChatProvider>
    </Router>
  );
}

export default App;
