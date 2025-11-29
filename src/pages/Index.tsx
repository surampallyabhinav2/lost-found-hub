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
      <header className="border-b border-border bg-card">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Lost & Found</h1>
              <p className="text-sm text-muted-foreground">Report and find lost items</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Form Section */}
        <section className="mb-12">
          <div className="bg-card rounded-xl shadow-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <ClipboardList className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-card-foreground">Report Lost/Found Item</h2>
                <p className="text-muted-foreground">Fill out the form below to report an item</p>
              </div>
            </div>
            <LostFoundForm onSubmit={handleSubmit} />
          </div>
        </section>

        {/* Recent Items Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Items</h2>
            {items.length > 0 && (
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
                {items.length}
              </span>
            )}
          </div>
          <RecentItems items={items} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Lost & Found Reporting System — Help reunite items with their owners
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
