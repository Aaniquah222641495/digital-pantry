import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppBubble } from "./components/WhatsAppBubble";
import { ThemeProvider } from "./lib/ThemeContext";
import { lazy, Suspense, useEffect } from "react";
import { SmoothScroll } from "./components/SmoothScroll";
import { applyMeta } from "./seo";

const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/not-found"));

function PageLoader() {
  return (
    <div className="min-h-[100dvh] bg-dp-bg" aria-busy="true" />
  );
}

// Keeps the tab title, description and canonical right when visitors move between pages.
function RouteMeta() {
  const [location] = useLocation();
  useEffect(() => { applyMeta(location); }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App({ ssrPath }: { ssrPath?: string } = {}) {
  return (
    <ThemeProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} ssrPath={ssrPath}>
        <div className="dp-grain flex min-h-[100dvh] flex-col bg-dp-bg text-dp-ink">
          <Navbar />
          <SmoothScroll />
          <RouteMeta />
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
