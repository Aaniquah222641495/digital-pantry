import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppBubble } from "./components/WhatsAppBubble";
import { ThemeProvider } from "./lib/ThemeContext";
import { useEffect } from "react";
import { SmoothScroll } from "./components/SmoothScroll";
import { applyMeta } from "./seo";

import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/not-found";


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
            <Router />
          </div>
          <Footer />
        </div>
        <WhatsAppBubble />
      </WouterRouter>
    </ThemeProvider>
  );
}

export default App;
