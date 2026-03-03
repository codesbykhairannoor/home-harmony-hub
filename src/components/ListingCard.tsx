import { Link } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";
import { MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  listing: Tables<"listings">;
  index?: number;
}

const ListingCard = ({ listing, index = 0 }: Props) => {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(listing.price);

  const images = listing.images ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/listing/${listing.id}`}
        className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all card-shadow hover:card-shadow-hover"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {images.length > 0 ? (
            <img
              src={images[0]}
              alt={listing.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground capitalize">
            {listing.category.replace("-", " ")}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
            {listing.title}
          </h3>
          <p className="mb-2 text-xs text-muted-foreground">{listing.provider_name}</p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {listing.location}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="text-xs font-medium">{listing.rating}</span>
            </div>
          </div>
          <p className="mt-2 text-sm font-bold text-primary">
            From {formattedPrice}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
