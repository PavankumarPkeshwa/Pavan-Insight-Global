import { useEffect, useState } from "react";
import axios from "axios";
import type { PostType } from "../types/PostType";

const RecentPosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="my-8 px-4">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-left">
        Recent Posts
      </h2>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded shadow p-4">
            <img
              src={post.thumbnail}
              alt="post"
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.description}</p>
            {post.date && (
              <p className="text-xs text-gray-400 mt-2">
                {post.author} · {new Date(post.date).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
