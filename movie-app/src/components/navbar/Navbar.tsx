import "./Navbar.css";
import { Button, Tooltip, Avatar, ConfigProvider, theme } from "antd";
import Search from "antd/es/input/Search";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import {
  Link,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { Logo } from "../logo/Logo";

interface IProp {
  username: string | undefined;
}

export function Navbar({ username }: IProp) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  return (
    <div className="navbar">
      <Logo fontSize="2rem"/>
      <div id="search-box">
        {location.pathname !== "/favorite" && (
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
            }}
          >
            <Search
              placeholder="Search movie..."
              bordered={false}
              size="large"
              onSearch={(value: string) => {
                setSearchParams({search: value})
              }}
            />
          </ConfigProvider>
        )}
      </div>
      <div className="navbar-group">
        <div id="favorite-button">
          <Link to="/favorite">
            <Tooltip title="Favorite Movie">
              <Button
                className="button"
                shape="circle"
                icon={<HeartFilled />}
              />
            </Tooltip>
          </Link>
        </div>
        <Link to={"/log-in"} id="user">
          <Avatar icon={<UserOutlined />} />
          <div className="greeting">
            Hello
            <div className="user-name">
              {username === undefined ? "There!" : username}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
