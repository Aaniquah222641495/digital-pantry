import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppBubble } from "./components/WhatsAppBubble";
import { ThemeProvider } from "./lib/ThemeContext";
import { MarketProvider } from "./lib/MarketContext";
import { useEffect } from "react";
import { SmoothScroll } from "./components/SmoothScroll";
import { applyMeta } from "./seo";

import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Faq from "./pages/Faq";
import About from "./pages/About";
import { BeautyBusinesses, FoodBusinesses, ProductBrands, TradesAndLocalServices } from "./pages/Industry";
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
      <Route path="/about" component={About} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/faq" component={Faq} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/websites-for-food-businesses" component={FoodBusinesses} />
      <Route path="/websites-for-beauty-businesses" component={BeautyBusinesses} />
      <Route path="/websites-for-product-brands" component={ProductBrands} />
      <Route path="/websites-for-trades-and-local-services" component={TradesAndLocalServices} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App({ ssrPath }: { ssrPath?: string } = {}) {
  return (
    <ThemeProvider>
      <MarketProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} ssrPath={ssrPath}>
        <div className="dp-grain flex min-h-[100dvh] flex-col bg-dp-bg text-dp-ink">
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-dp-cta focus:px-5 focus:py-3 focus:text-[15px] focus:font-medium focus:text-dp-cta-fg">
            Skip to content
          </a>
          <Navbar />
          <SmoothScroll />
          <RouteMeta />
          <div id="main" tabIndex={-1} className="flex-1 outline-none">
            <Router />
          </div>
          <Footer />
        </div>
        <WhatsAppBubble />
      </WouterRouter>
      </MarketProvider>
    </ThemeProvider>
  );
}

export default App;
