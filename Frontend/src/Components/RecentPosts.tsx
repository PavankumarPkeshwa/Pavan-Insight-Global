import React from "react";
import { Link } from "react-router-dom";

const RecentPosts: React.FC = () => {
  const posts = [
    {
      title: "Trump Is Back Trade War",
      image: "https://via.placeholder.com/200x200",
      author: "Pavan Kumar",
      date: "April 6, 2025",
      description:
        "Trump is back. Trade war between all the countries has imposed a tax on all the imports.",
    },
    {
      title: "Global Market Updates",
      image: "https://via.placeholder.com/200x200",
      author: "Jane Smith",
      date: "April 4, 2025",
      description: "Global markets are witnessing unprecedented shifts.",
    },
  ];

  return (
    <section className="py-6 px-4">
      <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
      <div className="grid grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <div className="flex">
              <img
                src={post.image}
                alt={post.title}
                className="w-40 h-40 object-cover rounded-md mr-4"
              />
              <div>
                <Link to={`/article/${index}`}>
                  <h3 className="text-lg font-bold hover:text-teal-600">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600">
                  By {post.author} | {post.date}
                </p>
                <p className="text-sm mt-2">{post.description}</p>
                <Link to={`/article/${index}`}>
                  <button className="mt-2 px-4 py-2 text-white bg-teal-400 rounded-md hover:bg-teal-500">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
