import React from 'react';

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

export interface IAdminTemplateProps {
  children?: React.ReactNode;
  menus?: string[];
  logo?: string;
  footer?: React.ReactNode;
}

export default React.memo(function AdminTemplate({
  children,
  footer,
}: IAdminTemplateProps) {
  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            nav 4
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>{footer}</Footer>
      </Layout>
    </Layout>
  );
});
