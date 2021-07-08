import { ReactChild, useContext } from 'react';

import { FormikContext } from 'formik';

interface FormFieldTypes {
  label: string | undefined;
  children: ReactChild;
  error: string;
}

export default function FormField({ label, children, error }: FormFieldTypes) {
  const formik = useContext(FormikContext);

  return (
    <div>
      {label && <div>{label}</div>}

      {children}

      <div className="helperText" style={{ color: 'red' }}>
        {Object.values(formik.touched).length ? error : ''}
      </div>
    </div>
  );
}
