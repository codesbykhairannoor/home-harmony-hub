import { useSearchParams } from "react-router-dom";
import { useSearchListings } from "@/hooks/useListings";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { Skeleton } from "@/components/ui/skeleton";

const SearchPage = () => {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const loc = params.get("loc") ?? "";

  const { data: filtered, isLoading } = useSearchListings(q, loc);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-10">
          <h1 className="text-2xl font-bold mb-1">Search Results</h1>
          <p className="text-sm text-muted-foreground mb-8">
            {isLoading ? "Searching…" : `${filtered?.length ?? 0} result${(filtered?.length ?? 0) !== 1 ? "s" : ""}`}
            {q && ` for "${q}"`}
            {loc && ` in "${loc}"`}
          </p>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border bg-card overflow-hidden">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered && filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((l, i) => (
                <ListingCard key={l.id} listing={l} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-muted-foreground">No services match your search.</p>
              <p className="mt-1 text-sm text-muted-foreground">Try different keywords or browse categories.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
