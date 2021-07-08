import { ReactNode } from 'react';

import { FormikProps, FormikProvider } from 'formik';

export { default as Input } from '@web/shared/components/form/Input';
export { default as Select } from '@web/shared/components/form/Select';
export { default as CheckBox } from '@web/shared/components/form/CheckBox';
export { default as Radio } from '@web/shared/components/form/Radio';
export { default as FormField } from '@web/shared/components/form/FormField';
export { default as DatePicker } from '@web/shared/components/form/DatePicker';
export { default as RangePicker } from '@web/shared/components/form/RangePicker';

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
