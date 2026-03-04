import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion, AnimatePresence } from "framer-motion";

type Category = "Weddings" | "Engagements" | "Portraits";

const galleryData: Record<Category, string[]> = {
  Weddings: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=400&fit=crop&q=80",
  ],
  Engagements: [
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=600&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=600&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=600&fit=crop&q=80",
  ],
  Portraits: [
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1621784166258-09a11e9af870?w=600&h=800&fit=crop&q=80",
  ],
};

const categories: Category[] = ["Weddings", "Engagements", "Portraits"];

const GallerySection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [active, setActive] = useState<Category>("Weddings");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos = galleryData[active];

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((p) => (p !== null ? (p - 1 + photos.length) % photos.length : null));
  const next = () => setLightbox((p) => (p !== null ? (p + 1) % photos.length : null));

  return (
    <section id="gallery" className="py-20 md:py-32 bg-cream">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-primary tracking-[0.2em] uppercase text-xs mb-3 font-medium">Gallery</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Love in Every Frame
          </h2>
        </motion.div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === c
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="columns-2 md:columns-3 gap-4 space-y-4"
        >
          {photos.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => openLightbox(i)}
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={src}
                  alt={`${active} photo ${i + 1}`}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-serif italic text-sm">
                    View
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/80 hover:text-white">
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 text-white/80 hover:text-white"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              src={photos[lightbox].replace("w=600", "w=1200").replace("h=800", "h=900").replace("h=400", "h=700").replace("h=600", "h=800")}
              alt="Gallery full view"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 text-white/80 hover:text-white"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
