import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/60" />

      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.3em] uppercase text-primary font-mono mb-6"
        >
          Passaic County, New Jersey
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.95] mb-8 font-display"
        >
          <span className="text-gradient">Build</span> Where{" "}
          <br className="hidden sm:block" />
          It <span className="text-gradient">Matters</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10"
        >
          220.work is NJ's first tech hub & co-working community — built for students, 
          founders, and developers who are ready to stop commuting and start building.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="hero" size="lg" asChild>
            <a href="#contact">Join the Waitlist</a>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <a href="#about">Learn More</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 flex justify-center gap-12 flex-wrap"
        >
          {[
            { value: "15 min", label: "from NYC" },
            { value: "100+", label: "Seats" },
            { value: "∞", label: "Potential" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-primary font-mono">{stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowDown className="animate-bounce" size={24} />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
