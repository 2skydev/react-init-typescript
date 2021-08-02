import React from 'react';

import { Button, Popconfirm, Space } from 'antd';

import { IAnyObject } from '@web/shared/types/etc';

interface moreButtonsTypes {
  label: string;
  onClick: () => void;
  moreButtonProps?: IAnyObject;
}

interface IProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onMore?: () => void;
  editButtonProps?: any;
  deleteButtonProps?: any;
  popconfirmProps?: any;
  moreButton?: boolean;
  moreButtonProps?: any;
  editTxt?: string;
  moreButtons?: Array<moreButtonsTypes>;
}

export default function TableActionColumn({
  onEdit,
  onDelete,
  onMore,
  editButtonProps,
  deleteButtonProps,
  popconfirmProps,
  moreButton,
  moreButtonProps,
  editTxt,
  moreButtons,
}: IProps) {
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    setLoading(true);

    try {
      await onDelete?.();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Space>
      {moreButtons &&
        moreButtons.map((v: moreButtonsTypes, i: number) => (
          <Button
            size="middle"
            onClick={v.onClick}
            {...v.moreButtonProps}
            key={i}
          >
            {v.label}
          </Button>
        ))}

      {moreButton && (
        <Button size="middle" onClick={() => onMore?.()} {...moreButtonProps}>
          상세보기
        </Button>
      )}

      <Button size="middle" onClick={() => onEdit?.()} {...editButtonProps}>
        {editTxt || '수정'}
      </Button>

      <Popconfirm
        title={
          <>
            정말로 삭제하시겠습니까?
            <br />
            삭제된 데이터는 복구할 수 없습니다.
          </>
        }
        onConfirm={handleConfirm}
        okButtonProps={{ loading }}
        okText="삭제"
        cancelText="취소"
        {...popconfirmProps}
      >
        <Button size="middle" danger {...deleteButtonProps}>
          삭제
        </Button>
      </Popconfirm>
    </Space>
  );
}
