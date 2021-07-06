import { ReactNode } from 'react';

import { FormikProps, FormikProvider } from 'formik';

export { default as Input } from 'shared/components/form/Input';
export { default as Select } from 'shared/components/form/Select';
export { default as CheckBox } from 'shared/components/form/CheckBox';
export { default as Radio } from 'shared/components/form/Radio';
export { default as FormField } from 'shared/components/form/FormField';

interface Type {
  formik: FormikProps<any>;
  children: ReactNode;
}

export const Form = ({ formik, children }: Type) => {
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="form">
        {children}
      </form>
    </FormikProvider>
  );
};
