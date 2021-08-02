import React from 'react';

import { Button } from 'antd';
import clsx from 'clsx';
import styled from 'styled-components';

import Icon from '@web/shared/components/icon/Icon';

const FormFooterStyle = styled.div<{ isFixed: boolean }>`
  width: 100%;
  background-color: #4563e9;
  padding: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);

  ${props =>
    props.isFixed &&
    `
    position: fixed;
    bottom: 0;
    left: 0;
  `}

  .ant-btn {
    font-size: 0.8rem;
  }

  .ant-btn-text {
    color: white;

    .icon {
      margin-left: -0.5rem;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  .saveButton {
    .icon {
      font-size: 1.1rem;
      margin-right: 0.3rem;
      margin-left: -0.3rem;
    }
  }
`;

interface IProps {
  onBack?: () => void;
  onSave?: () => void;
  saveButtonLoading?: boolean;
  backButtonText?: React.ReactNode;
  saveButtonText?: React.ReactNode;
  backButtonProps?: any;
  saveButtonProps?: any;
  className?: string;
  isFixed?: boolean;
}

export default function FormFooter({
  onBack,
  onSave,
  saveButtonLoading,
  backButtonText = '뒤로가기',
  saveButtonText = '저장하기',
  backButtonProps,
  saveButtonProps,
  className,
  isFixed = false,
}: IProps) {
  return (
    <FormFooterStyle
      className={clsx('formFooter', className)}
      isFixed={isFixed}
    >
      <div>
        <Button
          className="backButton"
          icon={<Icon icon="chevron_left" />}
          type="text"
          onClick={onBack}
          {...backButtonProps}
        >
          {backButtonText}
        </Button>
      </div>

      <div>
        <Button
          className="saveButton"
          loading={saveButtonLoading}
          onClick={onSave}
          {...saveButtonProps}
        >
          {saveButtonText}
        </Button>
      </div>
    </FormFooterStyle>
  );
}
