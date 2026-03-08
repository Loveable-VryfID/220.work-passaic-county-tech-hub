import { motion } from "framer-motion";
import { Zap, Users, Rocket, GraduationCap } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Train Students",
    description: "Bootcamps and workshops designed to bridge the gap between classroom and career.",
  },
  {
    icon: Zap,
    title: "Fine-Tune Developers",
    description: "Hackathons, code sprints, and mentorship to sharpen skills and ship real products.",
  },
  {
    icon: Rocket,
    title: "Breed Founders",
    description: "Incubator programs, pitch nights, and demo days to launch the next generation of startups.",
  },
  {
    icon: Users,
    title: "Build Community",
    description: "Networking events connecting NJ builders with NYC's thriving tech ecosystem.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-mono mb-4">
            Why 220.work?
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold font-display mb-6">
            More Than a <span className="text-gradient">Space</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            NJ has the talent. NYC has the scene. We're building the bridge — a purpose-built 
            tech hub where students, developers, and founders collide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors card-shadow group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
