import { AnimatedSection } from "../components/AnimatedSection";

const EMAIL = "thedigitalpantryza@gmail.com";

const h2Cls = "font-display font-bold text-gray-900 dark:text-white text-xl md:text-2xl mb-3";
const pCls = "font-body text-gray-600 dark:text-white/60 text-sm md:text-base leading-relaxed mb-3";
const ulCls = "list-disc pl-6 space-y-2 font-body text-gray-600 dark:text-white/60 text-sm md:text-base leading-relaxed mb-3";
const linkCls = "text-[#FF2D87] hover:underline";
const strongCls = "text-gray-900 dark:text-white font-semibold";

export default function Privacy() {
  return (
    <main className="pt-20">
      <section className="bg-[#FFF8FB] dark:bg-[#0A0A0A] py-16 md:py-20 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-4">Legal</p>
            <h1 className="font-display font-black text-gray-900 dark:text-white leading-tight mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Privacy Notice <span className="text-[#FFD700]">★</span>
            </h1>
            <p className="font-mono-brand text-gray-400 dark:text-white/40 text-xs tracking-widest uppercase mb-1">
              Digital Pantry Web Studio · thedigitalpantry.netlify.app
            </p>
            <p className="font-mono-brand text-gray-400 dark:text-white/40 text-xs tracking-widest uppercase mb-8">
              Last updated: 9 October 2026
            </p>
            <p className={pCls}>
              This explains how we look after your personal information under the Protection of Personal Information Act (POPIA).
            </p>

            <h2 className={`${h2Cls} mt-8`}>Who we are</h2>
            <p className={pCls}>
              Aaniquah Dicks, trading as Digital Pantry, Cape Town, South Africa. We are not a registered company yet. We are the "responsible party" for the information described here.
            </p>
            <p className={pCls}>
              Contact: <a className={linkCls} href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <br />
              Information Officer: Aaniquah Dicks.
            </p>

            <h2 className={`${h2Cls} mt-8`}>1. When you contact us through this website</h2>
            <p className={pCls}><span className={strongCls}>What we collect:</span> the name, business name, package choice and message you type into the contact form. If you email or WhatsApp us directly, we also see your email address or phone number.</p>
            <p className={pCls}><span className={strongCls}>How it works:</span> the form does not send anything to our server. When you press "Send", it opens a draft email in your own email app, addressed to us. Nothing reaches us unless you send that email.</p>
            <p className={pCls}><span className={strongCls}>Why:</span> to reply to your enquiry and, if you go ahead, to quote and build your website.</p>
            <p className={pCls}><span className={strongCls}>Who sees it:</span> only us. Emails arrive in Gmail (Google). We do not sell your information or use it for anything else.</p>
            <p className={pCls}><span className={strongCls}>How long:</span> If your enquiry does not become a project, we delete it after 12 months.</p>

            <h2 className={`${h2Cls} mt-8`}>2. When we contact your business first (outreach)</h2>
            <p className={pCls}>We sometimes find businesses that may need a website. We only use public business contact details.</p>
            <p className={pCls}><span className={strongCls}>What we keep:</span> business name, the type of business, your public phone or WhatsApp number, email address, Instagram handle, a one-line note about your website, and where we found you (for example, your Google Maps listing).</p>
            <p className={pCls}><span className={strongCls}>Why:</span> to send you one message asking if you would like a free website mock-up and quote. We do not send a sales pitch in that message. Every message tells you who we are and how to say no.</p>
            <p className={pCls}><span className={strongCls}>Where it is kept:</span> a private Google Sheet in our Google account. Only we can open it.</p>
            <p className={pCls}><span className={strongCls}>What happens next:</span></p>
            <ul className={ulCls}>
              <li>If you reply STOP or say no, we never contact you again. We keep only your email or number on a do-not-contact list, so we do not message you by mistake.</li>
              <li>If you do not reply, we do not contact you again, and we delete your contact details 90 days after our message.</li>
              <li>If you reply, we use your details only for what you asked about. If you say yes, we keep a record of your reply as proof of consent. We keep your details while we are talking, then for 12 months after that ends. We keep the consent record for as long as we market to you.</li>
              <li>If you replied but went quiet, we may follow up once, after 5 working days.</li>
            </ul>

            <h2 className={`${h2Cls} mt-8`}>3. Cookies and tracking</h2>
            <p className={pCls}>Our code sets no cookies and has no analytics, advertising or tracking tools. The site saves your light/dark choice in your browser's local storage (a setting called "dp-theme"). It stays on your device and we do not receive it.</p>
            <p className={pCls}>
              The site loads fonts from Google Fonts, so Google receives your IP address when a page loads. Our host, Netlify, keeps standard technical logs (such as your IP address) to run and secure the site, under{" "}
              <a className={linkCls} href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">Netlify's own privacy policy</a>.
            </p>

            <h2 className={`${h2Cls} mt-8`}>4. Other companies that handle information for us</h2>
            <ul className={ulCls}>
              <li><span className={strongCls}>Netlify</span> hosts this website.</li>
              <li><span className={strongCls}>Google</span> (Gmail, Google Sheets and Drive) holds our emails and our outreach Sheet; Google Fonts serves the site's fonts.</li>
              <li><span className={strongCls}>WhatsApp (Meta)</span> if you message us there, or we message you.</li>
            </ul>
            <p className={pCls}>Some of these providers (Google, Netlify, Meta/WhatsApp) may store information outside South Africa. We use only established providers with their own data protection commitments.</p>

            <h2 className={`${h2Cls} mt-8`}>5. Keeping it safe</h2>
            <p className={pCls}>Our Google account and Sheet are private and limited to us. We do not put your details in public places. If your information is ever compromised in a way that puts you at risk, we will tell you and the Information Regulator as soon as reasonably possible.</p>

            <h2 className={`${h2Cls} mt-8`}>6. Your rights</h2>
            <p className={pCls}>You can ask us to:</p>
            <ul className={ulCls}>
              <li>tell you what information we hold about you (access);</li>
              <li>correct it;</li>
              <li>delete it;</li>
              <li>stop using it, including for direct marketing (object).</li>
            </ul>
            <p className={pCls}>Email <a className={linkCls} href={`mailto:${EMAIL}`}>{EMAIL}</a>. We will reply within 30 days.</p>
            <p className={pCls}>
              You may also complain to the Information Regulator:{" "}
              <a className={linkCls} href="mailto:POPIAComplaints@inforegulator.org.za">POPIAComplaints@inforegulator.org.za</a>,{" "}
              <a className={linkCls} href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">https://inforegulator.org.za</a>, 010 023 5200 (checked 9 October 2026).
            </p>

            <h2 className={`${h2Cls} mt-8`}>7. Changes</h2>
            <p className={pCls}>If we change this notice, we will update the date at the top.</p>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
