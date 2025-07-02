import React from "react";
import Header from "./Components/Header";
import PostSlider from "./Components/PostSlider";
import RecentPosts from "./Components/RecentPosts";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";

const App: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <PostSlider />
      <div className="container mx-auto flex gap-4 py-6 px-4">
        <div className="w-3/4">
          <RecentPosts />
        </div>
        <div className="w-1/4">
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
