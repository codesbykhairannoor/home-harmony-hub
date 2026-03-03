import { Link } from "react-router-dom";
import { categories } from "@/data/mock-data";
import {
  Snowflake, Wrench, Zap, Sparkles, Paintbrush, Hammer, Bug, Settings,
} from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  Snowflake, Wrench, Zap, Sparkles, Paintbrush, Hammer, Bug, Settings,
};

const CategoryGrid = () => (
  <section className="container py-16">
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold">Browse by Category</h2>
      <p className="mt-2 text-muted-foreground">Find the right professional for every job</p>
    </div>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {categories.map((cat, i) => {
        const Icon = iconMap[cat.icon] || Settings;
        return (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/category/${cat.id}`}
              className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center transition-all card-shadow hover:card-shadow-hover hover:border-primary/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold">{cat.name}</p>
                <p className="text-xs text-muted-foreground">{cat.count} services</p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default CategoryGrid;
