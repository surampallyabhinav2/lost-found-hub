import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Package, User, Mail, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Item, ItemType, Category } from "@/types/item";
import { toast } from "@/hooks/use-toast";
import { ImageUpload } from "./ImageUpload";

const categories: Category[] = [
  "Bags",
  "Electronics",
  "Clothing",
  "Documents",
  "Keys",
  "Jewelry",
  "Books",
  "Sports",
  "Other",
];

interface LostFoundFormProps {
  onSubmit: (item: Item) => void;
}

export function LostFoundForm({ onSubmit }: LostFoundFormProps) {
  const [itemType, setItemType] = useState<ItemType>("lost");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [location, setLocation] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date>();
  const [imageUrl, setImageUrl] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !category || !location || !reporterName || !email || !date) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newItem: Item = {
      id: crypto.randomUUID(),
      type: itemType,
      name,
      description,
      category: category as Category,
      location,
      reporterName,
      email,
      phone: phone || undefined,
      date,
      createdAt: new Date(),
      imageUrl,
    };

    onSubmit(newItem);

    // Reset form
    setName("");
    setDescription("");
    setCategory("");
    setLocation("");
    setReporterName("");
    setEmail("");
    setPhone("");
    setDate(undefined);
    setImageUrl(undefined);

    toast({
      title: "Report submitted!",
      description: `Your ${itemType} item has been reported successfully.`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Item Type Toggle */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          What are you reporting?
        </Label>
        <RadioGroup
          value={itemType}
          onValueChange={(value) => setItemType(value as ItemType)}
          className="grid grid-cols-2 gap-4"
        >
          <Label
            htmlFor="lost"
            className={cn(
              "flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all",
              itemType === "lost"
                ? "border-lost bg-lost/5 text-lost"
                : "border-border hover:border-lost/50"
            )}
          >
            <RadioGroupItem value="lost" id="lost" className="sr-only" />
            <div className={cn(
              "w-3 h-3 rounded-full",
              itemType === "lost" ? "bg-lost" : "bg-muted"
            )} />
            <span className="font-semibold">Lost Item</span>
          </Label>
          <Label
            htmlFor="found"
            className={cn(
              "flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all",
              itemType === "found"
                ? "border-found bg-found/5 text-found"
                : "border-border hover:border-found/50"
            )}
          >
            <RadioGroupItem value="found" id="found" className="sr-only" />
            <div className={cn(
              "w-3 h-3 rounded-full",
              itemType === "found" ? "bg-found" : "bg-muted"
            )} />
            <span className="font-semibold">Found Item</span>
          </Label>
        </RadioGroup>
      </div>

      {/* Image Upload */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Item Photo (optional)
        </Label>
        <ImageUpload value={imageUrl} onChange={setImageUrl} />
      </div>

      {/* Item Details Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b border-border pb-2">
          Item Details
        </h3>

        <div className="space-y-2">
          <Label htmlFor="itemName" className="font-medium">Item Name *</Label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="itemName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Black leather wallet"
              className="pl-10 h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="font-medium">Description *</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed description of the item..."
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="font-medium">Category *</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-11 justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="font-medium">Location *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where was the item lost/found?"
              className="pl-10 h-11"
            />
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b border-border pb-2">
          Your Contact Information
        </h3>
        
        <div className="space-y-2">
          <Label htmlFor="reporterName" className="font-medium">Your Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="reporterName"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
              placeholder="Your full name"
              className="pl-10 h-11"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium">Email *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-10 h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="font-medium">Phone (optional)</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="pl-10 h-11"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        size="lg" 
        className="w-full h-12 text-base font-semibold gap-2 shadow-card hover:shadow-card-hover transition-shadow"
      >
        <Send className="h-4 w-4" />
        Submit Report
      </Button>
    </form>
  );
}
