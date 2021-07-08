import { ReactChild } from 'react';

interface FormFieldTypes {
  label: string | undefined;
  children: ReactChild;
  text: string | undefined;
  error: string | undefined;
}

export default function FormField({
  label,
  children,
  text,
  error,
}: FormFieldTypes) {
  return (
    <div>
      {label && <div>{label}</div>}

      {children}

      <div className="helperText" style={{ color: 'red' }}>
        {error && (text || error)}
      </div>
    </div>
  );
}
