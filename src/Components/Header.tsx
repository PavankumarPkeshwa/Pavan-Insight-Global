import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-teal-400">
          Pavan-Inside-<span className="text-white">Global</span>
        </h1>

        {/* Navigation */}
        <nav className="space-x-6">
          <a href="#home" className="hover:text-teal-400">
            Home
          </a>
          <a href="#technology" className="hover:text-teal-400">
            Technology
          </a>
          <a href="#fitness" className="hover:text-teal-400">
            Fitness
          </a>
          <a href="#travel" className="hover:text-teal-400">
            Travel
          </a>
          <a href="#investing" className="hover:text-teal-400">
            Investing
          </a>
          <a href="#lifestyle" className="hover:text-teal-400">
            Lifestyle
          </a>
          <a href="#sports" className="hover:text-teal-400">
            Sports
          </a>
          <a href="#signup" className="hover:text-teal-400">
            Signup
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
