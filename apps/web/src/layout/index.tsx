// import { Outlet } from "react-router-dom";

// export default function MainLayout() {
//   return (
//     <>
//       <nav className="text-white h-14 bg-zinc-800 flex items-center px-4">
//         Main Layout
//       </nav>

//       <Outlet /> {/* Outlet是子路由的占位符 */}
//     </>
//   );
// }

import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  HomeFilled,
  ShoppingFilled,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Row, Col, Typography, Space } from "antd";
import type { MenuProps } from "antd";
import HeaderRight from "./components/HeaderRight";

import ReactIcon from "@/assets/svg/react.svg?react";

const { Header, Sider, Content } = Layout;

const items: MenuProps["items"] = [
  {
    label: "user",
    path: "/user",
    icon: HomeFilled,
  },
  {
    label: "example",
    path: "/example",
    icon: ShoppingFilled,
  },
  {
    label: "nav",
    path: "/nav",
    icon: LayoutOutlined,
    children: [
      {
        label: "sub-1",
        path: "/nav/sub-1",
      },
      {
        label: "sub-2",
        path: "/nav/sub-2",
      },
    ],
  },
].map((nav) => ({
  key: nav.path,
  icon: React.createElement(nav.icon),
  label: nav.label,
  children: nav.children?.map((sub) => ({
    key: sub.path,
    label: sub.label,
  })),
}));

const BasicLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{ borderRight: "1px solid #eee" }}
      >
        <div
          style={{
            height: 64,
            borderBottom: "1px solid #eee",
            zIndex: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Space>
            <ReactIcon className="size-8 animate-spin-slow" />
            {!collapsed && (
              <Typography.Text strong style={{ fontSize: 18 }}>
                Vite Admin
              </Typography.Text>
            )}
          </Space>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[pathname]}
          items={items}
          onClick={handleMenuClick}
          style={{
            borderRight: 0,
          }}
        />
      </Sider>
      <Layout style={{ display: "flex", flexDirection: "column" }}>
        <Header
          style={{
            background: "#fff",
            borderBottom: "1px solid #eee",
            padding: 0,
          }}
        >
          <Row justify="space-between" style={{ paddingRight: "24px" }}>
            <Col>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col>
              <Typography.Text strong style={{ fontSize: 18 }}>
                react-template-admin
              </Typography.Text>
            </Col>
            <Col>
              <HeaderRight />
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            padding: "16px",
            flex: 1,
            overflowY: "auto",
            background: "rgb(249,250,251)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
