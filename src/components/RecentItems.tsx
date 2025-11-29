import { Item } from "@/types/item";
import { ItemCard } from "./ItemCard";
import { Search } from "lucide-react";

interface RecentItemsProps {
  items: Item[];
}

export function RecentItems({ items }: RecentItemsProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No items reported yet</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Be the first to report a lost or found item using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <ItemCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
