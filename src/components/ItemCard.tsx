import { format } from "date-fns";
import { MapPin, Calendar, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Item } from "@/types/item";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: Item;
  index: number;
}

export function ItemCard({ item, index }: ItemCardProps) {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-card-hover animate-fade-in",
        "border-l-4",
        item.type === "lost" ? "border-l-lost" : "border-l-found"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg text-card-foreground line-clamp-1">
            {item.name}
          </h3>
          <Badge 
            variant="secondary"
            className={cn(
              "shrink-0 font-medium",
              item.type === "lost" 
                ? "bg-lost/10 text-lost hover:bg-lost/20" 
                : "bg-found/10 text-found hover:bg-found/20"
            )}
          >
            {item.type === "lost" ? "Lost" : "Found"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Tag className="h-3.5 w-3.5" />
            <span>{item.category}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{format(item.date, "MMM d, yyyy")}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Reported by <span className="font-medium text-foreground">{item.reporterName}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
