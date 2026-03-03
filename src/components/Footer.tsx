import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-muted/50">
    <div className="container py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-lg font-bold">ServisList</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your trusted local home services marketplace. Find reliable professionals near you.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link>
            <Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground">Categories</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">For Providers</h4>
          <div className="flex flex-col gap-2">
            <Link to="/provider/login" className="text-sm text-muted-foreground hover:text-foreground">List Your Service</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Contact</h4>
          <p className="text-sm text-muted-foreground">support@servislist.com</p>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
        © 2026 ServisList. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
