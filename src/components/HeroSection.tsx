import { useEffect, useState, useCallback } from "react";
import { Heart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&h=1080&fit=crop&q=80",
];

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const h = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 16,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 5,
    }));
    setHearts(h);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-0 animate-float-heart text-primary/30"
          style={{
            left: `${h.left}%`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            animationIterationCount: "infinite",
          }}
        >
          <Heart style={{ width: h.size, height: h.size }} fill="currentColor" />
        </div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={images[current]}
            alt="Romantic wedding photography"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      <FloatingHearts />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-white/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-4 font-sans">
            Chennai's Premier Wedding Studio
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-4">
            Capture Love That
            <br />
            <span className="italic text-primary">Lasts Forever</span>
          </h1>
          <p className="text-white/90 font-serif italic text-lg md:text-2xl mb-2">
            Esh Photo Studio
          </p>
          <p className="text-white/70 text-sm md:text-base max-w-md mx-auto mb-8">
            Turning your most cherished moments into timeless heirlooms with romantic, candid storytelling.
          </p>
          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 hover:shadow-[0_0_30px_hsl(340_60%_65%/0.4)] hover:scale-105"
          >
            <Heart className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            Book Now
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
