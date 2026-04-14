import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, DoorOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  {
    icon: Monitor,
    title: "Dedicated Desks",
    description:
      "Your own permanent workspace with storage, power, and high-speed internet — ready whenever you are.",
  },
  {
    icon: DoorOpen,
    title: "Private Offices",
    description:
      "Lockable offices for teams of 2–8. Quiet focus, full privacy, and all the amenities of the hub.",
  },
  {
    icon: Calendar,
    title: "Event Space",
    description:
      "Host meetups, workshops, and demo days in our flexible event area with A/V and seating for 50+.",
  },
];

const Coworking = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    if (!name || !email) {
      toast({
        title: "Missing fields",
        description: "Please fill in your name and email.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    // Simulate submission
    setTimeout(() => {
      toast({
        title: "You're on the list!",
        description: "We'll be in touch soon with next steps.",
      });
      form.reset();
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.3em] uppercase text-primary font-mono mb-6"
          >
            Co-Working at 220.work
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] mb-8 font-display"
          >
            Your <span className="text-gradient">Desk</span>. Your{" "}
            <span className="text-gradient">Community</span>.
            <br className="hidden sm:block" /> Your{" "}
            <span className="text-gradient">City</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            Flexible workspaces designed for builders who want to stay local and
            think global. Desks, offices, and event space — all under one roof in
            Passaic County.
          </motion.p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 sm:py-28 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background border border-border rounded-xl p-8 hover:border-primary/40 transition-colors card-shadow group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold font-display mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interest Form */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-primary font-mono mb-4">
              Get Started
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
              Reserve Your <span className="text-gradient">Spot</span>
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground">
              Fill out the form below and our team will reach out with
              availability and pricing.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto space-y-5"
          >
            <div>
              <label className="block text-sm font-medium mb-1.5">Name</label>
              <Input
                name="name"
                placeholder="Your full name"
                required
                className="bg-card border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="bg-card border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Phone <span className="text-muted-foreground">(optional)</span>
              </label>
              <Input
                name="phone"
                type="tel"
                placeholder="(555) 123-4567"
                className="bg-card border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                I'm interested in
              </label>
              <Select name="interest">
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dedicated-desk">Dedicated Desk</SelectItem>
                  <SelectItem value="private-office">Private Office</SelectItem>
                  <SelectItem value="event-space">Event Space</SelectItem>
                  <SelectItem value="day-pass">Day Pass</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Tell us more
              </label>
              <Textarea
                name="message"
                placeholder="What are you working on? How can we help?"
                rows={4}
                className="bg-card border-border"
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Reserve My Spot"}
            </Button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Coworking;
