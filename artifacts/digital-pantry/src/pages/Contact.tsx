import { motion } from "framer-motion";
import { MessageCircle, Mail, Instagram } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { AnimatedSection } from "../components/AnimatedSection";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name:         z.string().min(2, "Name must be at least 2 characters"),
  businessName: z.string().min(1, "Business name is required"),
  package:      z.enum(["Starter", "Standard", "Premium"], { required_error: "Please select a package" }),
  message:      z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const QUICK_CONTACTS = [
  { icon: MessageCircle, label: "WhatsApp",  sub: "Fastest response",              href: "https://wa.me/27000000000",               color: "#25D366", testId: "button-contact-whatsapp"  },
  { icon: Mail,          label: "Email",     sub: "hello@thedigitalpantry.co.za",   href: "mailto:hello@thedigitalpantry.co.za",     color: "#FF2D87", testId: "button-contact-email"     },
  { icon: Instagram,     label: "Instagram", sub: "@thedigitalpantry",              href: "https://instagram.com/thedigitalpantry", color: "#E1306C", testId: "button-contact-instagram" },
];

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", businessName: "", message: "" },
  });

  const onSubmit = (data: ContactFormData) => {
    const subject = encodeURIComponent(`Website Enquiry — ${data.package} Package`);
    const body    = encodeURIComponent(`Hi!\n\nName: ${data.name}\nBusiness: ${data.businessName}\nPackage: ${data.package}\n\nMessage:\n${data.message}`);
    window.location.href = `mailto:hello@thedigitalpantry.co.za?subject=${subject}&body=${body}`;
    reset();
  };

  const inputCls =
    "w-full bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 focus:border-[#FF2D87] rounded-xl px-4 py-3.5 font-body text-gray-900 dark:text-white text-sm outline-none transition-colors placeholder:text-gray-400 dark:placeholder:text-white/25";
  const labelCls =
    "block font-mono-brand text-gray-400 dark:text-white/40 text-xs tracking-widest uppercase mb-2";

  return (
    <main className="pt-20">
      {/* ── Header ──────────────────────────────────── */}
      <section className="bg-[#FFF8FB] dark:bg-[#0A0A0A] grain-section py-16 md:py-20 relative overflow-hidden transition-colors duration-300">
        <span className="grain-deco top-10 right-8 text-[#FFD700]/8 text-[8rem] md:text-[10rem] font-bebas leading-none select-none pointer-events-none">★</span>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-4">Get in Touch</p>
            <h1 className="font-display font-black text-gray-900 dark:text-white leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              Let's Get <CutoutWord word="COOKING" baseSize="0.95em" /> ★
            </h1>
            <p className="font-body text-gray-500 dark:text-white/50 text-base md:text-lg mt-4 max-w-lg">
              Ready to get cooking? Let's build something delicious.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Quick Contact ────────────────────────────── */}
      <section className="bg-[#FFF0F5] dark:bg-[#0f0a0d] py-12 md:py-16 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="mb-6 md:mb-8">
            <p className="font-mono-brand text-gray-400 dark:text-white/40 text-xs tracking-[0.2em] uppercase">Reach Me On</p>
          </AnimatedSection>

          <div className="flex flex-wrap gap-3 md:gap-4">
            {QUICK_CONTACTS.map((contact, i) => (
              <AnimatedSection key={contact.label} delay={i * 0.05}>
                <motion.a
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-testid={contact.testId}
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 rounded-2xl border-2 px-6 py-4 bg-white dark:bg-transparent transition-all duration-200 shadow-sm dark:shadow-none"
                  style={{ borderColor: `${contact.color}40` }}
                >
                  <contact.icon size={20} style={{ color: contact.color }} className="shrink-0" />
                  <div>
                    <p className="font-body font-semibold text-gray-900 dark:text-white text-sm">{contact.label}</p>
                    <p className="font-mono-brand text-gray-500 dark:text-white/40 text-xs">{contact.sub}</p>
                  </div>
                </motion.a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form ─────────────────────────────── */}
      <section className="bg-[#FFF8FB] dark:bg-[#0A0A0A] py-16 md:py-20 transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="mb-8 md:mb-10">
            <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl md:text-4xl">
              Send a Message <span className="text-[#FFD700]">★</span>
            </h2>
            <p className="font-body text-gray-400 dark:text-white/40 mt-2 text-sm">Fill this in and it'll open your email client — quick and easy.</p>
          </AnimatedSection>

          {isSubmitSuccessful ? (
            <AnimatedSection>
              <div className="bg-white dark:bg-[#0f0a0d] border border-gray-200 dark:border-[#FF2D87]/30 rounded-2xl p-10 text-center shadow-sm dark:shadow-none">
                <div className="text-5xl mb-4 text-[#FFD700]">★</div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-2xl mb-2">Email ready!</h3>
                <p className="font-body text-gray-500 dark:text-white/50">Your email client should have opened. Send it when you're ready!</p>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection delay={0.1}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 bg-white dark:bg-transparent p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-transparent shadow-sm dark:shadow-none"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelCls}>Name</label>
                    <input id="name" type="text" placeholder="Your name" className={inputCls} data-testid="input-name" {...register("name")} />
                    {errors.name && <p className="font-body text-[#FF2D87] text-xs mt-1.5">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="businessName" className={labelCls}>Business Name</label>
                    <input id="businessName" type="text" placeholder="Your business" className={inputCls} data-testid="input-business-name" {...register("businessName")} />
                    {errors.businessName && <p className="font-body text-[#FF2D87] text-xs mt-1.5">{errors.businessName.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="package" className={labelCls}>Package</label>
                  <select id="package" className={`${inputCls} appearance-none cursor-pointer`} data-testid="select-package" defaultValue="" {...register("package")}>
                    <option value="" disabled>Select a package</option>
                    <option value="Starter">Starter — R1 500</option>
                    <option value="Standard">Standard — R2 500</option>
                    <option value="Premium">Premium — R4 000</option>
                  </select>
                  {errors.package && <p className="font-body text-[#FF2D87] text-xs mt-1.5">{errors.package.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className={labelCls}>Message</label>
                  <textarea id="message" rows={5} placeholder="Tell me about your business and what you need..." className={`${inputCls} resize-none`} data-testid="textarea-message" {...register("message")} />
                  {errors.message && <p className="font-body text-[#FF2D87] text-xs mt-1.5">{errors.message.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="button-submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#FF2D87] hover:bg-[#e0006e] text-white font-body font-semibold rounded-full py-4 text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Send It ★
                </motion.button>
              </form>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ── Bottom strip ─────────────────────────────── */}
      <section className="bg-[#FF2D87] py-8 md:py-10 text-center">
        <p className="font-bebas text-white text-xl md:text-2xl tracking-widest px-4">CODED IN PINK ★ BUILT TO PERFORM ★ CAPE TOWN</p>
      </section>
    </main>
  );
}
