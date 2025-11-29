import { useState } from "react";
import { Search, ClipboardList } from "lucide-react";
import { LostFoundForm } from "@/components/LostFoundForm";
import { RecentItems } from "@/components/RecentItems";
import { Item } from "@/types/item";

const Index = () => {
  const [items, setItems] = useState<Item[]>([]);

  const handleSubmit = (newItem: Item) => {
    setItems((prev) => [newItem, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-header text-primary-foreground">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
              <Search className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Lost & Found</h1>
              <p className="text-primary-foreground/80 text-sm">Help reunite items with their owners</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Form Section */}
        <section className="-mt-4">
          <div className="bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
            <div className="gradient-header px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-foreground/20">
                  <ClipboardList className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary-foreground">Report Lost/Found Item</h2>
                  <p className="text-primary-foreground/80 text-sm">Fill out the details below</p>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <LostFoundForm onSubmit={handleSubmit} />
            </div>
          </div>
        </section>

        {/* Recent Items Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">Recent Items</h2>
              {items.length > 0 && (
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold bg-primary text-primary-foreground">
                  {items.length}
                </span>
              )}
            </div>
          </div>
          <RecentItems items={items} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            Lost & Found Reporting System — Helping communities reconnect with their belongings
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
