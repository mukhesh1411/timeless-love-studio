import { Heart, Sparkles, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

const values = [
  { icon: Heart, title: "Romantic Storytelling", desc: "We capture the unscripted moments of love, creating visual narratives that tug at your heartstrings." },
  { icon: Sparkles, title: "Timeless Quality", desc: "Every image is meticulously crafted with dreamy edits and premium prints that stand the test of time." },
  { icon: Users, title: "Personalized Experience", desc: "Your love story is unique. We tailor every shoot to reflect your personality and vision." },
];

const teamImages = [
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&h=500&fit=crop&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=500&fit=crop&q=80",
  "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=400&h=500&fit=crop&q=80",
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 md:py-32 bg-cream">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.2em] uppercase text-xs mb-3 font-medium">About Us</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
            The Hearts Behind the Lens
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are passionate storytellers specializing in heartfelt wedding, engagement, and family portraits.
            Based in Chennai, we turn your special moments into cherished heirlooms with a romantic, candid style.
          </p>
        </motion.div>

        {/* Team photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-6 justify-center mb-16"
        >
          {teamImages.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl shadow-lg group mx-auto max-w-[280px] w-full"
            >
              <img
                src={src}
                alt={`Studio photo ${i + 1}`}
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
              className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blush mb-5">
                <v.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-full font-medium text-sm transition-all duration-300">
            Our Story
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
