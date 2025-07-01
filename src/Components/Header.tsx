import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Pavan Insight Global</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/category/politics" className="hover:underline">Politics</Link>
            </li>
            <li>
              <Link to="/category/sports" className="hover:underline">Sports</Link>
            </li>
            <li>
              <Link to="/category/technology" className="hover:underline">Technology</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
