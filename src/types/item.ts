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
  reporterName: string;
  email: string;
  phone?: string;
  date: Date;
  createdAt: Date;
}
