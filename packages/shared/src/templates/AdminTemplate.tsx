import React from 'react';
import { Link } from 'react-router-dom';

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import { IMenu } from '.';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export interface IAdminTemplateProps {
  children?: React.ReactNode;
  menus?: IMenu[];
  logo?: string;
  footer?: React.ReactNode;
}

export default React.memo(function AdminTemplate({
  children,
  footer,
  menus,
}: IAdminTemplateProps) {
  React.useEffect(() => {
    console.log('aaa');
  }, []);
  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          {menus &&
            menus.map((menu, i) =>
              menu.subMenu ? (
                <SubMenu icon={menu.icon} title={menu.name} key={menu.name}>
                  {menu.subMenu.map((subMenu, i) => (
                    <Menu.Item icon={subMenu.icon} key={subMenu.name}>
                      {subMenu.link ? (
                        <Link to={subMenu.link}>{subMenu.name}</Link>
                      ) : (
                        subMenu.name
                      )}
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item icon={menu.icon} key={menu.name}>
                  {menu.link ? (
                    <Link to={menu.link}>{menu.name}</Link>
                  ) : (
                    menu.name
                  )}
                </Menu.Item>
              ),
            )}
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
