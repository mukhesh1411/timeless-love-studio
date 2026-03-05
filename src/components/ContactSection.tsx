import { useState, FormEvent } from "react";
import { Heart, Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", date: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent! 💕", description: "We'll get back to you soon with love!" });
    setForm({ name: "", email: "", phone: "", message: "", date: "" });
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.2em] uppercase text-xs mb-3 font-medium">Contact</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            Let's Create Magic Together
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Ready to capture your love story? Reach out and let's plan something beautiful.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5"
          >
            {[
              { label: "Your Name", field: "name", type: "text", placeholder: "Your lovely name" },
              { label: "Email", field: "email", type: "email", placeholder: "hello@example.com" },
              { label: "Phone", field: "phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
              { label: "Preferred Date", field: "date", type: "date", placeholder: "" },
            ].map((f) => (
              <div key={f.field}>
                <label className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.field as keyof typeof form]}
                  onChange={(e) => update(f.field, e.target.value)}
                  required={f.field !== "date"}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your special day..."
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(340_60%_65%/0.3)]"
            >
              Send with Love 💕
            </button>

            <div className="flex gap-3 pt-2">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-border text-foreground hover:bg-muted transition-colors text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a
                href="mailto:info@eshphotostudio.in"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-border text-foreground hover:bg-muted transition-colors text-sm font-medium"
              >
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </div>
          </motion.form>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-5">
              {[
                { icon: MapPin, text: "Coimbatore, Tamil Nadu, India" },
                { icon: Phone, text: "+91 99948 78151" },
                { icon: Mail, text: "info@eshphotostudio.in" },
                { icon: Instagram, text: "@eshphotostudio" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-border h-64 lg:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.43289395918!2d76.88609635!3d11.0168445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f461b59%3A0x5e3e0e3c8e3e3e3e!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Studio location in Coimbatore"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
