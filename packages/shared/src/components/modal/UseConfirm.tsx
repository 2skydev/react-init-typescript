import React, { ReactNode, useState } from 'react';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

interface ConfirmType {
  content: ReactNode;
  onOk: () => any;
  onCancel: () => void;
  okText?: string;
  cancelText?: string;
}

export default function UseConfirm() {
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState<ReturnType<typeof Modal.confirm> | null>(
    null,
  );

  const confirm = ({
    content,
    onOk,
    onCancel,
    okText = '확인',
    cancelText = '취소',
  }: ConfirmType) => {
    const tmp = Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: content,
      okText,
      cancelText,
      onOk: async e => {
        setLoading(true);
        await onOk();
        setLoading(false);
      },
      onCancel: function () {
        setLoading(false);
        onCancel();
      },
      cancelButtonProps: {
        disabled: false,
      },
    });

    setTarget(tmp);
  };

  React.useEffect(() => {
    if (target) {
      target.update({
        cancelButtonProps: {
          disabled: true,
        },
      });
    }
  }, [loading]);

  return {
    confirm,
  };
}
