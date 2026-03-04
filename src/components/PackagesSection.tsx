import { Heart, Check, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { useCallback } from "react";

const packages = [
  {
    name: "Sweetheart",
    price: "₹25,000",
    features: ["4-hour coverage", "200 edited photos", "1 premium album", "Online gallery"],
    popular: false,
  },
  {
    name: "Forever",
    price: "₹45,000",
    features: ["8-hour wedding coverage", "400 edited photos", "Album + prints", "Engagement mini-shoot", "Online gallery"],
    popular: true,
  },
  {
    name: "Eternal",
    price: "₹75,000",
    features: ["Full-day + pre-wedding", "600+ edited photos", "Premium album", "Video highlights", "Drone shots", "Online gallery"],
    popular: false,
  },
  {
    name: "Custom Love",
    price: "Contact Us",
    features: ["Tailored to your needs", "Flexible coverage hours", "À la carte add-ons", "Destination weddings"],
    popular: false,
  },
];

const PackagesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="packages" className="py-20 md:py-32 bg-background">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.2em] uppercase text-xs mb-3 font-medium">Packages</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Love Story
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Beautiful packages designed for every celebration, from intimate ceremonies to grand weddings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              className={`relative rounded-2xl p-6 flex flex-col transition-all duration-500 cursor-pointer hover:-translate-y-2 ${
                pkg.popular
                  ? "bg-primary text-primary-foreground shadow-2xl scale-[1.03] hover:shadow-[0_0_40px_hsl(340_60%_65%/0.35)]"
                  : "bg-card border border-border hover:shadow-xl hover:shadow-primary/10"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Most Popular
                </div>
              )}

              <div className="text-center mb-6 pt-2">
                <Heart className={`w-8 h-8 mx-auto mb-3 ${pkg.popular ? "fill-primary-foreground/30" : "text-primary fill-primary/20"}`} />
                <h3 className="font-serif text-xl font-bold mb-1">{pkg.name}</h3>
                <p className={`text-2xl font-bold ${pkg.popular ? "" : "text-foreground"}`}>{pkg.price}</p>
              </div>

              <ul className="flex-1 space-y-3 mb-6">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.popular ? "text-primary-foreground/80" : "text-primary"}`} />
                    <span className={pkg.popular ? "text-primary-foreground/90" : "text-muted-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className={`w-full py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  pkg.popular
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
