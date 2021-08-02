import React from 'react';

import { Switch, SwitchProps } from 'antd';
import clsx from 'clsx';
import styled from 'styled-components';

const FormSectionStyle = styled.div`
  padding-top: 2rem;
  display: flex;

  &:not(:last-child) {
    .formSectionContent {
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }
  }

  .formSectionIndex {
    width: 4rem;
    font-weight: 500;
    font-size: 1rem;
    display: flex;

    span {
      display: block;
      color: #ff5722;
      opacity: 0.8;
      padding-top: 0.2rem;
      margin-left: 0.2rem;
    }
  }

  .formSectionContent {
    width: 100%;
    padding-bottom: 2rem;

    .formSectionHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;

      h3 {
        font-size: 1rem;
        margin-bottom: 0;
      }

      .switchBox {
        display: flex;
        align-items: center;

        .ant-switch {
          margin-right: 0.5rem;
        }
      }
    }

    .ant-input {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      padding-left: 4px;
    }

    .description {
      opacity: 0.7;
      color: #4563e9;
      margin-top: 1.5rem;
    }
  }
`;

interface IProps {
  index: number;
  title: string;
  description?: string;
  switchLabel?: string;
  children?: React.ReactNode;
  useSwitch?: boolean;
  required?: boolean;
  className?: string;
  switchProps?: SwitchProps;
}

export default function FormSection({
  index,
  title,
  description,
  switchLabel,
  children,
  useSwitch,
  required,
  className,
  switchProps,
}: IProps) {
  return (
    <FormSectionStyle className={clsx('formSection', className)}>
      <div className="formSectionIndex">
        {String(index).padStart(2, '0')}
        {required && <span>*</span>}
      </div>

      <div className="formSectionContent">
        <div className="formSectionHeader">
          <h3>{title}</h3>

          {useSwitch && (
            <div className="switchBox">
              <Switch {...switchProps} />
              <span>{switchLabel}</span>
            </div>
          )}
        </div>

        {children}

        {description && (
          <p className="description">
            {description.split('\n').map((text, i) => (
              <React.Fragment key={i}>
                {text}
                <br />
              </React.Fragment>
            ))}
          </p>
        )}
      </div>
    </FormSectionStyle>
  );
}
