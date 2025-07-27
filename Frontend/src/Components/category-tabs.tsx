import { useState } from "react";
import { Link } from "wouter";
import { categories, type Category } from "@shared/schema";

interface CategoryTabsProps {
  activeCategory?: Category | "all";
  onCategoryChange?: (category: Category | "all") => void;
}

export default function CategoryTabs({ activeCategory = "all", onCategoryChange }: CategoryTabsProps) {
  const getCategoryClasses = (category: Category | "all", isActive: boolean) => {
    if (isActive) {
      if (category === "all") {
        return "bg-blue-100 text-blue-700";
      }
      const colorMap: Record<string, string> = {
        Technology: "bg-purple-100 text-tech",
        Lifestyle: "bg-pink-100 text-lifestyle",
        Sports: "bg-green-100 text-sports",
        Fitness: "bg-orange-100 text-fitness",
        Food: "bg-red-100 text-food",
        Travel: "bg-teal-100 text-travel",
      };
      return colorMap[category] || "bg-gray-100 text-gray-700";
    }
    
    const hoverMap: Record<string, string> = {
      all: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      Technology: "bg-purple-100 text-tech hover:bg-purple-200",
      Lifestyle: "bg-pink-100 text-lifestyle hover:bg-pink-200",
      Sports: "bg-green-100 text-sports hover:bg-green-200",
      Fitness: "bg-orange-100 text-fitness hover:bg-orange-200",
      Food: "bg-red-100 text-food hover:bg-red-200",
      Travel: "bg-teal-100 text-travel hover:bg-teal-200",
    };
    return hoverMap[category] || "bg-gray-100 text-gray-700 hover:bg-gray-200";
  };

  return (
    <section className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide py-4 space-x-6">
          <Link href="/">
            <button
              className={`flex-shrink-0 px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${getCategoryClasses("all", activeCategory === "all")}`}
              onClick={() => onCategoryChange?.("all")}
            >
              All Stories
            </button>
          </Link>
          
          {categories.map((category) => (
            <Link key={category} href={`/category/${category.toLowerCase()}`}>
              <button
                className={`flex-shrink-0 px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${getCategoryClasses(category, activeCategory === category)}`}
                onClick={() => onCategoryChange?.(category)}
              >
                {category}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
