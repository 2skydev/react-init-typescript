import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { AnimateSharedLayout, motion } from 'framer-motion';
import styled from 'styled-components';

import { useRootSelector } from '@web/admin/src/hooks/useRootSelector';

import { IMenu } from '.';

export interface IAdminTemplateProps {
  children?: React.ReactNode;
  menus?: IMenu[] | undefined;
  contentSize?: number;
}

interface MenuItemTypes {
  name: string;
  link: string | undefined;
}

interface MenuListTypes {
  menus: IMenu[] | undefined;
  active: IMenu | undefined;
  onClickMenu: any;
}

interface SubMenuListTypes {
  active: IMenu | undefined;
}

const AdminTemplateBox = styled.div`
  .UI-content {
    padding: 0 2.75rem;
  }

  header {
    padding: 0 1.5rem;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    position: fixed;
    z-index: 11;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: saturate(180%) blur(20px);

    .left {
      display: flex;

      .menu-list {
        display: flex;
      }

      .active > div {
        color: #000;
        font-weight: bold;
      }

      .logo {
        height: 4rem;
        line-height: 4rem;
        padding: 0 1.25rem;
        cursor: pointer;

        img {
          height: 1.08rem;
        }
      }
    }

    .right {
      display: flex;

      .anticon-user {
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        background: #4563e9;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }

      .anticon-logout {
        position: relative;
        top: -1px;
      }

      > div {
        transition: 0.1s;
        color: #444;

        span {
          font-weight: bold;
          margin-right: 2px;
        }

        .anticon {
          margin-right: 0.4rem;
        }

        &:hover {
          color: #4563e9;
        }
      }
    }
  }

  .menuActiveLine {
    width: 100%;
    height: 2px;
    position: absolute;
    background: #4563e9;
    bottom: 0;
  }
`;

const Item = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.25rem 0 1.25rem;
  cursor: pointer;
  color: #909399;
  position: relative;

  &.active {
    color: #000;
  }
`;

const AdminSubHeader = styled.div`
  padding: 1.5rem 2.75rem 1rem 2.75rem;
  margin-top: 64px;

  .menulist {
    display: flex;

    > div {
      font-size: 27px;
      font-weight: 700;
      padding-left: 0;
      opacity: 0.2;
      cursor: pointer;
      color: #222;
      padding-right: 0.8rem;
      letter-spacing: -1px;
      transition: 0.1s;

      &:hover {
        opacity: 0.5;
      }

      &.active {
        opacity: 1;
      }
    }
  }
`;

const MenuItem = ({ name, link }: MenuItemTypes) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const move = (link: string | undefined) => {
    history.push(link as string);
  };

  return (
    <Item
      className={pathname === link ? 'active' : ''}
      onClick={() => move(link)}
    >
      {name}
    </Item>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      <h2>Logo</h2>
    </div>
  );
};

const MenuList = ({ menus, active, onClickMenu }: MenuListTypes) => {
  return (
    <AnimateSharedLayout>
      <div className="menu-list">
        {menus &&
          menus.map((v, key) => (
            <motion.div
              style={{ position: 'relative' }}
              className={active?.link === v.link ? 'active' : ''}
              key={key}
              onClick={() => onClickMenu(v)}
            >
              <MenuItem name={v.name} link={v.link} />

              {active?.link === v.link && (
                <motion.div
                  className="menuActiveLine"
                  layoutId="menuActiveLine"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}
            </motion.div>
          ))}
      </div>
    </AnimateSharedLayout>
  );
};

const SubMenuList = ({ active }: SubMenuListTypes) => {
  return (
    <AdminSubHeader>
      {active && (
        <div className="menulist">
          {active.subMenu?.map((v, key) => (
            <MenuItem name={v.name} link={v.link} key={key} />
          ))}
        </div>
      )}
    </AdminSubHeader>
  );
};

export default React.memo(function AdminTemplate({
  children,
  menus,
  contentSize,
}: IAdminTemplateProps) {
  const { pathname } = useLocation();
  const [active, setActive] = useState<IMenu | undefined>(undefined);

  const user = useRootSelector(state => state.shared.auth.user);

  useEffect(() => {
    setActive(
      menus?.find(
        v => v.link === pathname || v.subMenu?.some(x => x.link === pathname),
      ),
    );
  }, [pathname]);

  return (
    <AdminTemplateBox>
      <header>
        <div className="left">
          <Logo />
          <MenuList
            menus={menus}
            active={active}
            onClickMenu={(v: IMenu | undefined) => {
              setActive(v);
            }}
          />
        </div>

        <div className="right">
          <Item className="logout">
            <UserOutlined /> <span>{user?.username}</span>님
          </Item>

          <Item className="logout">
            <LogoutOutlined /> 로그아웃
          </Item>
        </div>
      </header>

      <SubMenuList active={active} />

      <div
        className="UI-content"
        style={{
          maxWidth: contentSize ? contentSize + 'px' : '100%',
          margin: '0 auto',
        }}
      >
        {children}
      </div>
    </AdminTemplateBox>
  );
});
