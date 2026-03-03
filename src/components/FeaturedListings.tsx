import { listings } from "@/data/mock-data";
import ListingCard from "@/components/ListingCard";

const FeaturedListings = () => (
  <section className="container py-16">
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold">Featured Services</h2>
      <p className="mt-2 text-muted-foreground">Top-rated professionals ready to help</p>
    </div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {listings.slice(0, 6).map((listing, i) => (
        <ListingCard key={listing.id} listing={listing} index={i} />
      ))}
    </div>
  </section>
);

export default FeaturedListings;
