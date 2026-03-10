import { motion } from "framer-motion";
import { Wifi, Monitor, Coffee, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import spaceInterior from "@/assets/space-interior.jpg";

const amenities = [
  { icon: Monitor, label: "Dedicated desks & private offices" },
  { icon: Wifi, label: "High-speed fiber internet" },
  { icon: Coffee, label: "Event space for 100+ people" },
  { icon: MapPin, label: "Under an hour from NYC by train" },
  { icon: Clock, label: "Incubator program (coming soon)" },
];

const SpaceSection = () => {
  return (
    <section id="space" className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-primary font-mono mb-4">
              The Home Base
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold font-display mb-6">
              An Old Factory.{" "}
              <span className="text-gradient">A New Era.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We're converting a historic factory in the heart of Passaic County into NJ's first 
              purpose-built tech hub. Whether you're a student, a solo developer, or a startup 
              team — this is your home base for building, connecting, and growing.
            </p>

            <div className="space-y-4 mb-8">
              {amenities.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                    <item.icon className="text-primary" size={16} />
                  </div>
                  <span className="text-secondary-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" asChild>
              <a href="#contact">Book a Tour</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden glow-border">
              <img
                src={spaceInterior}
                alt="220.work coworking space interior with exposed brick and modern workstations"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 card-shadow">
              <p className="text-sm font-mono text-primary">Now Converting</p>
              <p className="text-xs text-muted-foreground">Opening 2026</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpaceSection;
