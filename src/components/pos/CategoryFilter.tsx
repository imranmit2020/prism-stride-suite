import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const allCategories = ["all", ...categories];
  
  return (
    <div className="flex gap-2 flex-wrap">
      {allCategories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={cn(
            "capitalize",
            selectedCategory === category && "bg-primary text-primary-foreground"
          )}
        >
          {category === "all" ? "All Items" : category}
        </Button>
      ))}
    </div>
  );
}