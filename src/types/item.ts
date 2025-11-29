export type ItemType = "lost" | "found";

export type Category = 
  | "Bags"
  | "Electronics"
  | "Clothing"
  | "Documents"
  | "Keys"
  | "Jewelry"
  | "Books"
  | "Sports"
  | "Other";

export interface Item {
  id: string;
  type: ItemType;
  name: string;
  description: string;
  category: Category;
  location: string;
  reporter_name: string;
  email: string;
  phone?: string;
  date: string;
  created_at: string;
  image_url?: string;
}
