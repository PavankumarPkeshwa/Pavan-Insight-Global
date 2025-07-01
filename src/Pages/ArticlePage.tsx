import { useParams } from "react-router-dom";

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Article ID: {id}</h1>
      <p>This is where the full article content will appear.</p>
    </div>
  );
};

export default ArticlePage;
