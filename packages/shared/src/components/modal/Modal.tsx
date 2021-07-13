import React, { ReactNode } from 'react';

import { Modal as AntModal, Button } from 'antd';

interface ModalTypes {
  open: boolean;
  onClose: any;
  title?: string;
  submit?: any;
  okTxt?: string;
  closeTxt?: string;
  children: ReactNode;
  footer?: Array<ReactNode>;
  width?: number;
}

const Modal = ({
  open,
  onClose,
  title,
  submit,
  children,
  okTxt = '저장',
  closeTxt = '닫기',
  footer = [],
  width = 550,
}: ModalTypes) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const onSubmit = async () => {
    setConfirmLoading(true);
    await submit();
    setConfirmLoading(false);
    onClose();
  };

  return (
    <>
      <AntModal
        centered
        title={title}
        visible={open}
        confirmLoading={confirmLoading}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            {closeTxt}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={onSubmit}
          >
            {okTxt}
          </Button>,
          ...footer,
        ]}
        width={width}
      >
        {children}
      </AntModal>
    </>
  );
};

export default Modal;
