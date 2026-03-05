import { Heart, Instagram, Facebook } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background py-12">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Heart className="w-5 h-5 text-primary fill-primary" />
        <span className="font-serif text-xl font-semibold">AD Photo Studio</span>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {[
          { icon: Instagram, href: "https://instagram.com/adphotostudio" },
          { icon: Facebook, href: "https://facebook.com/adphotostudio" },
        ].map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
          >
            <s.icon className="w-4 h-4" />
          </a>
        ))}
      </div>

      <p className="text-background/60 text-sm mb-2">
        © {new Date().getFullYear()} AD Photo Studio. All rights reserved.
      </p>
      <p className="text-background/40 text-xs flex items-center justify-center gap-1">
        Made with <Heart className="w-3 h-3 text-primary fill-primary" /> in Coimbatore
      </p>
    </div>
  </footer>
);

export default Footer;
