import { useState } from "react";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import ArticleCard from "./article-card";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query
  useState(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  });

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["/api/search", debouncedQuery],
    queryFn: () => api.searchArticles(debouncedQuery),
    enabled: debouncedQuery.length > 2 && isOpen,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="max-w-4xl mx-auto mt-20 px-4" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white rounded-lg shadow-xl p-6 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Search Articles</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {/* Search Results */}
          {debouncedQuery.length > 2 && (
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-4">
                Search results for "{debouncedQuery}"
              </h4>
              
              {isLoading ? (
                <div className="grid gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex space-x-4">
                      <Skeleton className="w-24 h-16 rounded" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchResults && searchResults.length > 0 ? (
                <div className="grid gap-4 max-h-96 overflow-y-auto">
                  {searchResults.map((article) => (
                    <div key={article.id} onClick={onClose}>
                      <ArticleCard article={article} variant="compact" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No articles found matching your search.
                </p>
              )}
            </div>
          )}
          
          {debouncedQuery.length <= 2 && query.length > 0 && (
            <p className="text-gray-500 text-center py-8">
              Type at least 3 characters to search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
