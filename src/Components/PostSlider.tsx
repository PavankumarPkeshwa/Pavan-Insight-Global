import React from "react";

const PostSlider: React.FC = () => {
  const posts = [
    {
      title: "AI-Powered Robo Advisors",
      image: "https://via.placeholder.com/300x200",
      author: "David Lee",
      date: "April 10, 2025",
    },
    {
      title: "Global Trade Tensions",
      image: "https://via.placeholder.com/300x200",
      author: "John Doe",
      date: "April 5, 2025",
    },
    {
      title: "The Earthquake",
      image: "https://via.placeholder.com/300x200",
      author: "Emily Carter",
      date: "May 1, 2025",
    },
  ];

  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold text-center mb-4">Trending Posts</h2>
      <div className="flex overflow-x-auto space-x-4 px-4 scrollbar-hide">
        {posts.map((post, index) => (
          <div
            key={index}
            className="min-w-[300px] bg-white shadow-lg rounded-lg p-4"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-sm text-gray-600">
              By {post.author} | {post.date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PostSlider;
