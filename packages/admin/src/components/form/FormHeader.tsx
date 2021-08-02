import React from 'react';

import clsx from 'clsx';
import styled from 'styled-components';

import Icon from '@web/shared/components/icon/Icon';

const FormHeaderStyle = styled.div`
  background-color: #fafbfc;
  padding: 36px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);

  .headerRap {
    max-width: 1280px;
    margin: 0 auto;
  }

  .breadcrumb {
    display: inline-flex;
    align-items: center;
    background-color: rgb(245, 245, 245);
    color: #bbb;
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    margin-left: -0.4rem;

    span {
      color: #888;
    }

    .icon {
      font-size: 1rem;
    }
  }

  h1 {
    margin-top: 1.2rem;
    margin-bottom: 1rem;
    font-size: 1.6rem;
    font-weight: bold;
  }

  .requiredDescription {
    color: #ff5722;
    display: flex;
    align-items: center;
    font-size: 0.7rem;
    opacity: 0.8;

    span {
      display: block;
      margin-bottom: -0.5rem;
      margin-right: 0.4rem;
      font-size: 0.9rem;
    }
  }

  .close {
    position: absolute;
    right: 36px;
    top: 36px;
    cursor: pointer;
  }
`;

interface IProps {
  breadcrumb: string[];
  title: string;
  hasRequired?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function FormHeader({
  breadcrumb,
  title,
  hasRequired,
  onClose,
  className,
}: IProps) {
  return (
    <FormHeaderStyle className={clsx('formHeader', className)}>
      <div className="headerRap">
        <div className="breadcrumb">
          {breadcrumb.map((text, i) => (
            <React.Fragment key={i}>
              {i < breadcrumb.length - 1 ? <span>{text}</span> : text}
              {i < breadcrumb.length - 1 && <Icon icon="chevron_right" />}
            </React.Fragment>
          ))}
        </div>

        <div>
          <h1>{title}</h1>

          {hasRequired && (
            <div className="requiredDescription">
              <span>*</span> 필수항목입니다
            </div>
          )}
        </div>

        {onClose && <Icon icon="close" className="close" onClick={onClose} />}
      </div>
    </FormHeaderStyle>
  );
}
