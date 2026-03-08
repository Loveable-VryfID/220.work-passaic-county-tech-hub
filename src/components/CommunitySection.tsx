import { motion } from "framer-motion";

const audiences = [
  {
    emoji: "🎓",
    title: "Students",
    description: "From NJIT, William Paterson, Passaic County CC, and beyond. Get mentored, get hired, get building.",
  },
  {
    emoji: "🚀",
    title: "Founders",
    description: "Stop commuting to NYC for community. Build your startup where it's affordable, accessible, and supported.",
  },
  {
    emoji: "💻",
    title: "Developers",
    description: "Level up through hackathons, open source projects, and a dev community that actually shows up.",
  },
  {
    emoji: "🏢",
    title: "Entrepreneurs",
    description: "From side hustles to serious ventures. Get workspace, resources, and a network that accelerates you.",
  },
];

const CommunitySection = () => {
  return (
    <section id="community" className="py-24 sm:py-32 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-mono mb-4">
            Who It's For
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold font-display mb-6">
            Built for <span className="text-gradient">Builders</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Whether you're just learning to code or raising your Series A — 220.work is your launchpad.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-8 rounded-xl border border-border bg-background hover:border-primary/30 transition-colors"
            >
              <span className="text-4xl mb-4 block">{item.emoji}</span>
              <h3 className="text-lg font-semibold font-display mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
