import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto grid grid-cols-3 gap-4 px-4">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold">TrendingNews</h3>
          <p className="text-sm mt-2">
            Welcome to TrendingNews, your trusted source for the latest news.
          </p>
          <p className="text-sm mt-2">
            <i className="mr-2">📞</i> 0987654321
          </p>
          <p className="text-sm">
            <i className="mr-2">✉️</i> pavankumarp@gmail.com
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="mt-2">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Blog</li>
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-bold">Contact Us</h3>
          <input
            type="text"
            placeholder="Enter your email..."
            className="w-full p-2 border rounded-md mb-2"
          />
          <textarea
            placeholder="Your message..."
            className="w-full p-2 border rounded-md mb-2"
          ></textarea>
          <button className="px-4 py-2 text-white bg-teal-400 rounded-md hover:bg-teal-500">
            Send
          </button>
        </div>
      </div>
      <p className="text-center mt-4 text-sm">
        © Pavan Kumar P. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
