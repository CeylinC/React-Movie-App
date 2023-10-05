import "./Navbar.css";
import { Button, Tooltip, Avatar, ConfigProvider, theme, Input } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Logo } from "../logo/Logo";

const { Search } = Input;

interface IProp {
  username?: string;
}

export function Navbar({ username }: IProp) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  return (
    <div className="navbar flex justify-between content-center fixed top-0 w-full box-border p-5">
      <Logo fontSize="2rem" className="mr-5" />
      <div id="search-box" className="rounded-lg w-4/5">
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
                setSearchParams({ search: value });
              }}
              className="py-1"
            />
          </ConfigProvider>
        )}
      </div>
      <div className="navbar-group flex items-center">
        <div id="favorite-button">
          <Link to="/favorite">
            <Tooltip title="Favorite Movie">
              <Button
                className="button mx-5 border-none"
                shape="circle"
                icon={<HeartFilled />}
              />
            </Tooltip>
          </Link>
        </div>
        <Link
          to={"/log-in"}
          id="user"
          className="no-underline inline-flex flex-row-reverse items-center"
        >
          <Avatar icon={<UserOutlined />} />
          <div className="greeting mr-2 text-xs text-end">
            Hello
            <div className="user-name text-sm">
              {username === undefined || username === "" ? "There!" : username}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
