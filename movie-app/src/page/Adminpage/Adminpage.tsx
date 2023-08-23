import "./Adminpage.css";
import { Layout, Menu, theme } from 'antd';
import { useNavigate, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const navigation = [
  { label: "Movie List", key: "/admin/movie-list" },
  { label: "Add Movie", key: "/admin/add-movie" }
];

interface IProp{
  key: string
}

function Adminpage() {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = ({key} : IProp) => {
    if(key) {
      navigate(key);
    }
  }

  return (
     <Layout className="Adminpage">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/admin/movie-list']}
          items={navigation}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>MoW ©2023 Created by CeylinC</Footer>
      </Layout>
    </Layout>
  );
}

export default Adminpage;
