import { useParams } from "react-router-dom";
import { useListingsByCategory } from "@/hooks/useListings";
import { categories } from "@/data/mock-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = categories.find((c) => c.id === categoryId);
  const { data: filtered, isLoading } = useListingsByCategory(categoryId);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="hero-gradient py-12">
          <div className="container">
            <h1 className="text-3xl font-bold text-primary-foreground">
              {category?.name ?? "Category"}
            </h1>
            <p className="mt-1 text-primary-foreground/70">
              {isLoading ? "Loading…" : `${filtered?.length ?? 0} service${(filtered?.length ?? 0) !== 1 ? "s" : ""} available`}
            </p>
          </div>
        </div>
        <div className="container py-10">
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
              <p className="text-lg font-medium text-muted-foreground">No services found in this category yet.</p>
              <p className="mt-1 text-sm text-muted-foreground">Check back soon or try another category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
