import { ReactChild, useContext } from 'react';

import { FormikContext } from 'formik';
import styled from 'styled-components';

interface FormFieldTypes {
  label: string | undefined;
  children: ReactChild;
  error: string;
}

const HelperTxtDiv = styled.div`
  position: relative;
  margin-bottom: 10px;

  .helperText {
    font-size: 11px;
    position: absolute;
    z-index: 1;
  }

  input,
  textarea {
    border-radius: 0;
  }

  &.error {
    select,
    textarea,
    input {
      border-color: red !important;
    }
  }
`;

export default function FormField({ label, children, error }: FormFieldTypes) {
  const formik = useContext(FormikContext);
  const isError = Object.values(formik.touched).length;

  return (
    <HelperTxtDiv className={isError && error ? 'error' : ''}>
      {label && <div>{label}</div>}

      {children}

      <div className="helperText" style={{ color: 'red' }}>
        {isError ? error : ''}
      </div>
    </HelperTxtDiv>
  );
}
