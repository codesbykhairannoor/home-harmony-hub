import { useSearchParams } from "react-router-dom";
import { listings } from "@/data/mock-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";

const SearchPage = () => {
  const [params] = useSearchParams();
  const q = params.get("q")?.toLowerCase() ?? "";
  const loc = params.get("loc")?.toLowerCase() ?? "";

  const filtered = listings.filter((l) => {
    const matchQ = !q || l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.category.includes(q);
    const matchLoc = !loc || l.location.toLowerCase().includes(loc);
    return matchQ && matchLoc;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-10">
          <h1 className="text-2xl font-bold mb-1">Search Results</h1>
          <p className="text-sm text-muted-foreground mb-8">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            {q && ` for "${q}"`}
            {loc && ` in "${loc}"`}
          </p>
          {filtered.length > 0 ? (
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
