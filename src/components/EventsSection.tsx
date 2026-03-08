import { motion } from "framer-motion";
import { Calendar, Code, Mic, Trophy, Presentation, Network } from "lucide-react";

const events = [
  {
    icon: Code,
    title: "Hackathons",
    description: "Weekend build sprints where teams ship products from scratch. Prizes, mentors, and real users.",
  },
  {
    icon: Calendar,
    title: "Bootcamps",
    description: "Intensive multi-week programs on fundraising, product development, and go-to-market strategy.",
  },
  {
    icon: Network,
    title: "Networking Nights",
    description: "Monthly meetups connecting NJ builders with investors, engineers, and operators from NYC.",
  },
  {
    icon: Presentation,
    title: "Pitch Nights",
    description: "Founders present to a panel of investors and seasoned operators. Real feedback, real opportunities.",
  },
  {
    icon: Trophy,
    title: "Demo Days",
    description: "Quarterly showcases where startups demo their products to investors, press, and the community.",
  },
  {
    icon: Mic,
    title: "Speaker Series",
    description: "Fireside chats with founders, VCs, and industry leaders from across the tri-state tech scene.",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-24 sm:py-32 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-mono mb-4">
            Events & Programs
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold font-display mb-6">
            Where <span className="text-gradient">Builders</span> Gather
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            We're not just offering desks. We're building a calendar of events that brings the best 
            of NYC's tech scene to Passaic County.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4 p-6 rounded-xl border border-border hover:border-primary/30 bg-background transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <event.icon className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-semibold font-display mb-1">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
