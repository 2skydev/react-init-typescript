import { useHistory } from 'react-router-dom';

import { Button, Table, Tag } from 'antd';
import styled from 'styled-components';

import { useActionAPI } from '@web/shared/apis';
import Icon from '@web/shared/components/icon/Icon';
import localeKR from '@web/shared/locale/kr';
import { IAnyObject } from '@web/shared/types/etc';
import { IRole, IUser } from '@web/shared/types/strapi';
import { format } from '@web/shared/utils/date';

import TableAction from '~/components/table/TableAction';
import UserFormModal from '~/components/user/UserFormModal';
import useFormModal from '~/hooks/useFormModal';
import usePaging from '~/hooks/usePaging';

const UsersTableStyled = styled.div`
  .ant-table-cell {
    .ant-tag {
      display: inline-flex;
      align-items: center;
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    margin: 2.5rem 0 1.5rem;

    .icon {
      margin-left: -0.3rem;
      margin-right: 0.3rem;
    }
  }
`;

interface IProps {
  qs?: IAnyObject;
}

export default function UsersTable({ qs }: IProps) {
  const {
    data: users,
    isLoading,
    pagination,
  } = usePaging({ qs, table: 'users' });

  const { action } = useActionAPI('users');
  const { open } = useFormModal();

  const columns: any = [
    {
      title: '고유번호',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '역할',
      dataIndex: 'role',
      key: 'role',
      width: 130,
      render: (role: IRole) => localeKR[`role.enum.type.${role.type}`] || '',
    },
    {
      title: '아이디',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
      width: 300,
    },
    {
      title: '로그인 제공자',
      dataIndex: 'provider',
      key: 'provider',
      render: (provider: string) => {
        const label = localeKR[`user.enum.provider.${provider}`];
        const color = localeKR[`user.enum.provider.${provider}.color`];

        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: '가입일',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 130,
      render: (created_at: string) => format(created_at),
    },
    {
      title: '기능',
      key: 'actions',
      width: 250,
      render: (user: IUser) => {
        const isMainAdmin = user.username === 'admin';

        return (
          <TableAction
            onEdit={() => open('user', { userID: user.id })}
            onDelete={() => action('delete', null, user.id)}
            deleteButtonProps={{
              disabled: isMainAdmin,
            }}
            popconfirmProps={{
              disabled: isMainAdmin,
            }}
          />
        );
      },
    },
  ];

  return (
    <UsersTableStyled>
      <div className="buttons">
        <Button
          icon={<Icon icon="add" />}
          type="primary"
          onClick={() => open('user')}
        >
          회원 생성
        </Button>
      </div>

      <Table
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={users}
        pagination={pagination}
      />

      <UserFormModal />
    </UsersTableStyled>
  );
}
