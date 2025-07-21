import React, { useEffect, useState } from "react";
import axios from "axios";

type Post = {
  title: string;
  thumbnail: string;
  author: string;
  date: string;
};

const PostSlider: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts/slider");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load posts", err);
      }
    };

    fetchPosts();
  }, []);

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
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-sm text-gray-600">
              By {post.author} |{" "}
              {post.date ? new Date(post.date).toLocaleDateString() : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PostSlider;
