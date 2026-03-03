import { useParams, Link } from "react-router-dom";
import { listings } from "@/data/mock-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ChevronLeft, MessageCircle } from "lucide-react";
import { useState } from "react";

const APP_NAME = "ServisList";

const ListingDetailPage = () => {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!listing) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Listing not found</h1>
            <Link to="/" className="mt-4 inline-block text-primary hover:underline">Back to Home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(listing.price);

  const whatsappMessage = encodeURIComponent(
    `Hi, I saw your "${listing.title}" listing on ${APP_NAME}. I would like to order this service. Could you provide more details?`
  );
  const whatsappUrl = `https://wa.me/${listing.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-6">
          {/* Breadcrumb */}
          <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
            Back to listings
          </Link>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* Images - left side */}
            <div className="lg:col-span-3">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={listing.images[selectedImage]}
                  alt={listing.title}
                  className="aspect-video w-full object-cover"
                />
              </div>
              {listing.images.length > 1 && (
                <div className="mt-3 flex gap-2">
                  {listing.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`h-16 w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                        i === selectedImage ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info - right side */}
            <div className="lg:col-span-2">
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground capitalize mb-3">
                {listing.category.replace("-", " ")}
              </span>
              <h1 className="text-2xl font-bold md:text-3xl">{listing.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{listing.providerName}</p>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-semibold">{listing.rating}</span>
                  <span className="text-xs text-muted-foreground">({listing.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {listing.location}
                </div>
              </div>

              <div className="mt-6 rounded-xl border bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="text-3xl font-bold text-primary">{formattedPrice}</p>
              </div>

              {/* WhatsApp CTA */}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 block">
                <Button className="w-full h-14 text-base font-semibold bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </Button>
              </a>

              <div className="mt-8">
                <h3 className="mb-3 text-lg font-semibold">About this service</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {listing.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListingDetailPage;
