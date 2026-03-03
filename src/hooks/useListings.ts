import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Listing = Tables<"listings">;

export const usePublicListings = () =>
  useQuery({
    queryKey: ["listings", "public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("is_paid", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Listing[];
    },
  });

export const useListingById = (id: string | undefined) =>
  useQuery({
    queryKey: ["listings", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id!)
        .eq("is_paid", true)
        .maybeSingle();
      if (error) throw error;
      return data as Listing | null;
    },
  });

export const useListingsByCategory = (categoryId: string | undefined) =>
  useQuery({
    queryKey: ["listings", "category", categoryId],
    enabled: !!categoryId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("category", categoryId!)
        .eq("is_paid", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Listing[];
    },
  });

export const useSearchListings = (q: string, loc: string) =>
  useQuery({
    queryKey: ["listings", "search", q, loc],
    queryFn: async () => {
      let query = supabase
        .from("listings")
        .select("*")
        .eq("is_paid", true);

      if (q) {
        query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%,category.ilike.%${q}%`);
      }
      if (loc) {
        query = query.ilike("location", `%${loc}%`);
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return data as Listing[];
    },
  });
