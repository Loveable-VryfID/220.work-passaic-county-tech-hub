import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-6xl font-bold font-display mb-6">
            Ready to <span className="text-gradient">Build</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Whether you're a student looking for community, a developer seeking collaborators, 
            or a founder ready to launch — we want to hear from you. Join the waitlist 
            and be the first to know when 220.work opens its doors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="mailto:hello@220.work">
                Get in Touch <ArrowRight size={18} />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="https://ventures220.lovable.app" target="_blank" rel="noopener noreferrer">
                220Ventures
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
