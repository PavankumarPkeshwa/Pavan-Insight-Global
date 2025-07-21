import React, { useState, useRef } from "react";

const Admin: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "", // This will be a preview URL
    author: "",
    date: "",
    content: "",
  });

  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  // Thumbnail upload
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  // Inline image insert
  const handleInlineImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const inlineImageUrl = URL.createObjectURL(e.target.files[0]);
      const contentArea = contentRef.current;
      if (contentArea) {
        const cursorPos = contentArea.selectionStart;
        const newText =
          formData.content.slice(0, cursorPos) +
          `\n![Inline Image](${inlineImageUrl})\n` +
          formData.content.slice(cursorPos);
        setFormData({ ...formData, content: newText });
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit post");
    }

    const data = await response.json();
    console.log("Submitted News:", data);
    alert("News post submitted!");

    // Clear form
    setFormData({
      title: "",
      image: "",
      author: "",
      date: "",
      content: "",
    });
  } catch (err) {
    console.error(err);
    alert("Error submitting post");
  }
};


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Admin: Add New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        {/* Thumbnail image upload */}
        <div>
          <label className="block mb-1 font-medium">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
            className="block mb-2"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="h-40 rounded-md shadow"
            />
          )}
        </div>

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        {/* Content Area with Inline Upload */}
        <label className="block font-medium">Post Content</label>
        <textarea
          ref={contentRef}
          name="content"
          placeholder="Full content here..."
          value={formData.content}
          onChange={handleChange}
          rows={8}
          className="w-full p-2 border rounded-md"
          required
        />
        <label className="text-sm text-gray-500 block">
          Insert inline image at cursor:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleInlineImageUpload}
          className="block mb-2"
        />
        <button
          type="submit"
          className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default Admin;
