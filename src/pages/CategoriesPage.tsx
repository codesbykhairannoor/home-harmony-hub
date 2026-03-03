import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryGrid from "@/components/CategoryGrid";

const CategoriesPage = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1">
      <div className="hero-gradient py-12">
        <div className="container">
          <h1 className="text-3xl font-bold text-primary-foreground">All Categories</h1>
          <p className="mt-1 text-primary-foreground/70">Browse services by category</p>
        </div>
      </div>
      <CategoryGrid />
    </main>
    <Footer />
  </div>
);

export default CategoriesPage;
