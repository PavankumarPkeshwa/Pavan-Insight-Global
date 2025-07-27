import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchOverlay from "./search-overlay";
import { categories } from "@shared/schema";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [location] = useLocation();

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      Technology: "text-tech hover:text-purple-700 hover:bg-purple-50",
      Lifestyle: "text-lifestyle hover:text-pink-700 hover:bg-pink-50",
      Sports: "text-sports hover:text-green-700 hover:bg-green-50",
      Fitness: "text-fitness hover:text-orange-700 hover:bg-orange-50",
      Food: "text-food hover:text-red-700 hover:bg-red-50",
      Travel: "text-travel hover:text-teal-700 hover:bg-teal-50",
    };
    return colorMap[category] || "text-gray-700 hover:text-blue-600 hover:bg-blue-50";
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <span className="text-white font-bold text-lg">P</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                      Pavan-Insight-Global
                    </h1>
                    <p className="text-xs text-gray-500 leading-none">News & Insights</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                location === "/" ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}>
                Home
              </Link>
              {categories.map((category) => (
                <Link key={category} href={`/category/${category.toLowerCase()}`} className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${getCategoryColor(category)}`}>
                  {category}
                </Link>
              ))}
            </nav>

            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-white/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/" 
                  className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                    location === "/" ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                {categories.map((category) => (
                  <Link key={category} href={`/category/${category.toLowerCase()}`} 
                    className={`block px-4 py-3 rounded-lg transition-all duration-200 ${getCategoryColor(category)}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
