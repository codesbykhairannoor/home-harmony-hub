import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Trash2, LogOut } from "lucide-react";
import { categories } from "@/data/mock-data";
import type { Tables } from "@/integrations/supabase/types";

type Listing = Tables<"listings">;

const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [providerName, setProviderName] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch listings");
    } else {
      setListings(data ?? []);
    }
    setLoading(false);
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `${user!.id}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("listing-images")
        .upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage
        .from("listing-images")
        .getPublicUrl(path);
      urls.push(urlData.publicUrl);
    }
    return urls;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrls: string[] = [];
      if (imageFiles.length > 0) {
        imageUrls = await uploadImages(imageFiles);
      }

      const { error } = await supabase.from("listings").insert({
        user_id: user!.id,
        title: title.trim(),
        description: description.trim(),
        category,
        location: location.trim(),
        price: parseFloat(price),
        whatsapp_number: whatsapp.trim(),
        provider_name: providerName.trim(),
        images: imageUrls,
        is_paid: false,
      });

      if (error) throw error;

      toast.success("Listing created! It will be visible once payment is confirmed.");
      resetForm();
      fetchListings();
    } catch (err: any) {
      toast.error(err.message || "Failed to create listing");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("listings").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete listing");
    } else {
      toast.success("Listing deleted");
      setListings((prev) => prev.filter((l) => l.id !== id));
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setLocation("");
    setPrice("");
    setWhatsapp("");
    setProviderName("");
    setImageFiles([]);
    setShowForm(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Provider Dashboard</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowForm(!showForm)} className="gap-2">
                <Plus className="h-4 w-4" />
                New Listing
              </Button>
              <Button variant="outline" onClick={signOut} className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Create Listing Form */}
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create New Listing</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="title">Service Title</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Professional AC Cleaning" required maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="providerName">Business / Provider Name</Label>
                    <Input id="providerName" value={providerName} onChange={(e) => setProviderName(e.target.value)} placeholder="Your business name" required maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location / City</Label>
                    <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Jakarta Selatan" required maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (IDR, starting from)</Label>
                    <Input id="price" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="150000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input id="whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="6281234567890" required maxLength={20} />
                    <p className="text-xs text-muted-foreground">Include country code, e.g. 6281234567890</p>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your service in detail…" required rows={4} maxLength={1000} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="images">Images</Label>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
                    />
                    <p className="text-xs text-muted-foreground">Upload up to 5 images for your listing</p>
                  </div>
                  <div className="sm:col-span-2 flex gap-2">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? "Creating…" : "Create Listing"}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Listings Table */}
          <Card>
            <CardHeader>
              <CardTitle>My Listings</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              ) : listings.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">You haven't created any listings yet.</p>
                  <Button onClick={() => setShowForm(true)} className="mt-4 gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Listing
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listings.map((l) => (
                      <TableRow key={l.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">{l.title}</TableCell>
                        <TableCell className="capitalize">{l.category.replace("-", " ")}</TableCell>
                        <TableCell>{l.location}</TableCell>
                        <TableCell>
                          {l.is_paid ? (
                            <Badge className="bg-green-600">Published</Badge>
                          ) : (
                            <Badge variant="secondary">Draft — Payment Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(l.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
