import {
  DatabaseOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

export const Nav = () => {
  const { pathname } = useLocation();
  return (
    <div className="nav">
      <div>
        <Link to="/" className={pathname === '/' ? 'active' : ''}>
          <HomeOutlined /> Famous Quote Quiz
        </Link>
      </div>
      <div>
        <Link to="/stats" className={pathname === '/stats' ? 'active' : ''}>
          {" "}
          <DatabaseOutlined /> Stats
        </Link>
        <Link to="/options" className={pathname === '/options' ? 'active' : ''}>
          {" "}
          <MenuOutlined /> Options
        </Link>
      </div>
    </div>
  );
};
