import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("loc", location);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 hero-gradient opacity-85" />
      </div>

      <div className="container relative z-10 py-20 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl text-balance">
            Find Trusted Home Services Near You
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
            Connect with verified local professionals for AC, plumbing, cleaning, and more — instantly via WhatsApp.
          </p>

          {/* Search form */}
          <form onSubmit={handleSearch} className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="What service do you need?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 bg-background pl-10 text-foreground"
              />
            </div>
            <div className="relative sm:w-44">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12 bg-background pl-10 text-foreground"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8">
              Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
