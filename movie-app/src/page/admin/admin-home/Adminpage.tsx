import "./Adminpage.css";
import { Layout, Menu, theme } from "antd";
import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useUserControl, useUserStore } from "../../../hook";
import { Logo } from "../../../components";

const { Header, Content, Footer, Sider } = Layout;

const navigation = [
  { label: "Movie List", key: "/admin/movie-list" },
  { label: "Add Movie", key: "/admin/add-movie" },
];

interface IProp {
  key: string;
}

export function Adminpage() {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = ({ key }: IProp) => {
    if (key) {
      navigate(key);
    }
  };

  useUserControl(user, setUser);

  useEffect(() => {
    if (user) {
      if (user.role !== "admin") {
        navigate("/log-in");
      }
    }
  }, []);

  return (
    <Layout className="Adminpage">
      <Sider breakpoint="lg" collapsedWidth="0">
          <div className="sidebar-logo"><Logo fontSize="2rem" /></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={navigation}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          MoW ©2023 Created by CeylinC
        </Footer>
      </Layout>
    </Layout>
  );
}
