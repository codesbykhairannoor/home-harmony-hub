export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface ServiceListing {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  location: string;
  price: number;
  whatsappNumber: string;
  images: string[];
  isPaid: boolean;
  createdAt: string;
  providerName: string;
  rating: number;
  reviewCount: number;
}
