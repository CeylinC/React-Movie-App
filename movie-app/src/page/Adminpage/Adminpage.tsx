import "./Adminpage.css";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, Table, theme, Image } from 'antd';
import React, { useEffect, useState } from "react";
import { getMovieList } from "../../service/Post";
import { ColumnsType } from "antd/es/table";
import { IMovie } from "../../interface/IMovie";

const { Header, Content, Footer, Sider } = Layout;

interface DataType extends IMovie {
  key: React.Key;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Poster",
    dataIndex: "poster",
    key: "poster",
    render: imgUrl => <Image width={100} src={imgUrl} />
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'IMDB',
    dataIndex: 'imdb',
    key: 'imdb',
  },
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
];


function Adminpage() {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
  const [dataList, setDataList] = useState<DataType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const movieList = await getMovieList();
      movieList.forEach((movie, index) => {
        setDataList((prev) => {
          return [...prev, {...movie, key: index}];
        });
      });
    }
    getData();
  }, []);

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
          defaultSelectedKeys={['4']}
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `nav ${index + 1}`,
            }),
          )}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
          <>
          <Table columns={columns} dataSource={dataList} />
    </>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>MoW ©2023 Created by CeylinC</Footer>
      </Layout>
    </Layout>
  );
}

export default Adminpage;
