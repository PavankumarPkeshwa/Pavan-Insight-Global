import { useParams } from "react-router-dom";

const CategoryPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Category: {name}</h1>
      <p>Here are the latest updates on {name}.</p>
    </div>
  );
};

export default CategoryPage;
