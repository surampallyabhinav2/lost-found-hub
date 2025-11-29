import { Item } from "@/types/item";
import { ItemCard } from "./ItemCard";
import { Package, Loader2 } from "lucide-react";

interface RecentItemsProps {
  items: Item[];
  loading?: boolean;
}

export function RecentItems({ items, loading }: RecentItemsProps) {
  if (loading) {
    return (
      <div className="text-center py-16 px-4 rounded-xl border-2 border-dashed border-border bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading items...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-xl border-2 border-dashed border-border bg-muted/30">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No items reported yet</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Be the first to report a lost or found item using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item, index) => (
        <ItemCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
