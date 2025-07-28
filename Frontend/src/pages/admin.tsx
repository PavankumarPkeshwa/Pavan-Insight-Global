import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Database, Trash2, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminStatus {
  scheduler: {
    isRunning: boolean;
    nextRun: string;
    lastRun: string;
  };
  database: {
    totalArticles: number;
    categoryCounts: Array<{
      _id: string;
      count: number;
      avgLikes: number;
    }>;
    lastUpdated: string;
  };
  timestamp: string;
}

export default function AdminPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: status, isLoading } = useQuery<AdminStatus>({
    queryKey: ["/api/admin/status"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

 const scrapeMutation = useMutation<{ message: string }, Error>({
  mutationFn: api.scrapeNews,
  onSuccess: (data) => {
    toast({
      title: "Success",
      description: data.message,
    });
    queryClient.invalidateQueries({ queryKey: ["/api/admin/status"] });
    queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
  },
  onError: (error) => {
    toast({
      title: "Error",
      description: error.message || "Failed to scrape news",
      variant: "destructive",
    });
  },
});


const cleanupMutation = useMutation<{ message: string }, Error, number>({
  mutationFn: api.cleanupArticles,
  onSuccess: (data) => {
    toast({
      title: "Success",
      description: data.message,
    });
    queryClient.invalidateQueries({ queryKey: ["/api/admin/status"] });
  },
  onError: (error) => {
    toast({
      title: "Error",
      description: error.message || "Failed to cleanup articles",
      variant: "destructive",
    });
  },
});


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage news scraping and database operations</p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading admin status...</div>
        ) : status ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Scheduler Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  News Scraper Status
                </CardTitle>
                <CardDescription>
                  Automatic news scraping runs every 5 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    status.scheduler.isRunning ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {status.scheduler.isRunning ? "Running" : "Idle"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Run:</span>
                  <span className="text-sm text-gray-600">
                    {formatDate(status.scheduler.lastRun)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Next Run:</span>
                  <span className="text-sm text-gray-600">
                    {formatDate(status.scheduler.nextRun)}
                  </span>
                </div>
                <Button
                  onClick={() => scrapeMutation.mutate()}
                  disabled={scrapeMutation.isPending || status.scheduler.isRunning}
                  className="w-full"
                >
                  {scrapeMutation.isPending ? "Scraping..." : "Run Manual Scrape"}
                </Button>
              </CardContent>
            </Card>

            {/* Database Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Statistics
                </CardTitle>
                <CardDescription>
                  Current article storage and distribution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Total Articles:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                    {status.database.totalArticles}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <span className="text-sm font-medium">Category Distribution:</span>
                  {status.database.categoryCounts.map((category) => (
                    <div key={category._id} className="flex items-center justify-between text-sm">
                      <span>{category._id}:</span>
                      <div className="flex items-center gap-2">
                        <span>{category.count} articles</span>
                        <span className="text-gray-500">
                          ({Math.round(category.avgLikes)} avg likes)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <Button
                    onClick={() => cleanupMutation.mutate(30)}
                    disabled={cleanupMutation.isPending}
                    variant="outline"
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {cleanupMutation.isPending ? "Cleaning..." : "Cleanup Old Articles (30+ days)"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Info */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  ML News Classification System
                </CardTitle>
                <CardDescription>
                  Intelligent news categorization and content processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Features:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Automatic categorization</li>
                      <li>• Content quality filtering</li>
                      <li>• Sentiment analysis</li>
                      <li>• Duplicate detection</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Sources:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• TechCrunch</li>
                      <li>• BBC News</li>
                      <li>• Reuters</li>
                      <li>• RSS Feeds</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Categories:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Technology</li>
                      <li>• Lifestyle</li>
                      <li>• Sports & Fitness</li>
                      <li>• Food & Travel</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Status:</strong> The ML system is automatically scraping and categorizing news articles 
                    every 5 hours. Articles are filtered for quality, classified by category, and stored in MongoDB 
                    with generated excerpts and reading time estimates.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-8 text-red-600">
            Failed to load admin status. Please check your connection.
          </div>
        )}
      </main>
    </div>
  );
}
