import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Post = {
  _id: string;
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000, 
    pauseOnHover: true,
  };

  return (
    <section className="py-6 px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Trending Posts</h1>
      <Slider {...settings}>
        {posts.map((post) => (
          <div key={post._id} className="px-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-md font-semibold mb-1">{post.title}</h3>
                <p className="text-sm text-gray-500">
                  By {post.author} |{" "}
                  {post.date ? new Date(post.date).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default PostSlider;
