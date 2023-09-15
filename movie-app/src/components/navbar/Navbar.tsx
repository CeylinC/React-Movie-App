import "./Navbar.css";
import { Button, Tooltip, Avatar, ConfigProvider, theme } from "antd";
import Search from "antd/es/input/Search";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface IProp {
  setSearchParam: ({ search }: { search: string }) => void,
  username: string | undefined,
}

export function Navbar({ setSearchParam, username }: IProp) {
  return (
    <div className="navbar">
      <div id="logo">M<span>O</span>W</div>
      <div id="search-box">
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          <Search placeholder="Search movie..."
            bordered={false}
            size="large"
            onSearch={(value: string) => (setSearchParam({ search: value.charAt(0).toUpperCase() + value.slice(1) }))} />
        </ConfigProvider>
      </div>
      <div className="navbar-group">
        <div id="favorite-button">
          <Link to="/favorite">
            <Tooltip title="Favorite Movie">
              <Button className="button" shape="circle" icon={<HeartFilled />} />
            </Tooltip>
          </Link>
        </div>
        <div id="user">
          <Avatar icon={<UserOutlined />} />
          <div className="greeting">
            Hello
            <div className="user-name">
              {username === undefined ? "There!" : username}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
