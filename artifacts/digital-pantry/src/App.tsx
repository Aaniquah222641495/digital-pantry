import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppBubble } from "./components/WhatsAppBubble";
import { ThemeProvider } from "./lib/ThemeContext";
import { lazy, Suspense, useEffect } from "react";

const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/not-found"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#FFF8FB] dark:bg-[#0A0A0A] flex items-center justify-center">
      <div className="text-[#FF2D87] font-bebas text-3xl tracking-widest animate-pulse">
        Loading ★
      </div>
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <div className="min-h-screen bg-[#FFF8FB] dark:bg-[#0A0A0A] flex flex-col transition-colors duration-300">
          <Navbar />
          <ScrollToTop />
          <div className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Router />
            </Suspense>
          </div>
          <Footer />
        </div>
        <WhatsAppBubble />
      </WouterRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
