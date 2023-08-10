import "./Navbar.css";
import { Button, Tooltip, Avatar, ConfigProvider, theme } from "antd";
import Search from "antd/es/input/Search";
import { HeartFilled, UserOutlined } from "@ant-design/icons";

function Navbar() {
  return (
    <div className="navbar">
      <div id="logo">M<span>O</span>W</div>
      <div id="search-box">
      <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
    }}
  >
        <Search placeholder="Search movie..." bordered={false} size="large" />
        </ConfigProvider>
      </div>
      <div className="navbar-group">
      <div id="favorite-button">
        <Tooltip title="Favorite Movie">
          <Button className="button" shape="circle" icon={<HeartFilled />} />
        </Tooltip>
      </div>
      <div id="user">
        <Avatar icon={<UserOutlined />} />
        <div className="greeting">
          Hello
          <div className="user-name">
            Ceylin Çaltepe
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Navbar;
