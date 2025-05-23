import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";
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
import "./App.css";

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
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/start" element={<EligibilityPage />} />
              <Route path="/report/:id" element={<ReportPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/mentions-legales" element={<LegalPage />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </ChatProvider>
    </Router>
  );
}

export default App;
