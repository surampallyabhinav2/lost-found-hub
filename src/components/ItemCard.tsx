import { format, parseISO } from "date-fns";
import { MapPin, Calendar, Tag, ImageIcon, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Item } from "@/types/item";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: Item;
  index: number;
}

export function ItemCard({ item, index }: ItemCardProps) {
  const dateValue = typeof item.date === 'string' ? parseISO(item.date) : item.date;
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 animate-fade-in group",
        "border border-border"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image or Placeholder */}
      <div className={cn(
        "relative h-40 overflow-hidden",
        item.type === "lost" ? "bg-lost/5" : "bg-found/5"
      )}>
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className={cn(
              "h-12 w-12",
              item.type === "lost" ? "text-lost/30" : "text-found/30"
            )} />
          </div>
        )}
        <Badge 
          className={cn(
            "absolute top-3 right-3 font-semibold shadow-sm",
            item.type === "lost" 
              ? "bg-lost text-lost-foreground hover:bg-lost/90" 
              : "bg-found text-found-foreground hover:bg-found/90"
          )}
        >
          {item.type === "lost" ? "Lost" : "Found"}
        </Badge>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-card-foreground line-clamp-1">
            {item.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
            {item.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted text-muted-foreground">
            <Tag className="h-3 w-3" />
            <span>{item.category}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{format(dateValue, "MMM d, yyyy")}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">{item.location}</span>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            <span>Contact: <span className="font-medium text-foreground">{item.reporter_name}</span></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
