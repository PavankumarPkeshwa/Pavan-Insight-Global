import React from "react";

const Sidebar: React.FC = () => {
  const topics = [
    "Technology",
    "Fitness",
    "Travel",
    "Investing",
    "Lifestyle",
    "Sports",
  ];

  return (
    <aside className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Search</h3>
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded-md mb-4"
      />
      <h3 className="text-xl font-bold mb-4">Topics</h3>
      <ul>
        {topics.map((topic, index) => (
          <li key={index} className="py-2 border-b">
            {topic}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
