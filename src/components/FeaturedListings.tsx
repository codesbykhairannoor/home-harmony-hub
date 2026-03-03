import { usePublicListings } from "@/hooks/useListings";
import ListingCard from "@/components/ListingCard";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedListings = () => {
  const { data: listings, isLoading } = usePublicListings();

  return (
    <section className="container py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">Featured Services</h2>
        <p className="mt-2 text-muted-foreground">Top-rated professionals ready to help</p>
      </div>
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card overflow-hidden">
              <Skeleton className="aspect-[4/3] w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : listings && listings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.slice(0, 6).map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-muted-foreground">
          <p>No services listed yet. Be the first to list your service!</p>
        </div>
      )}
    </section>
  );
};

export default FeaturedListings;
