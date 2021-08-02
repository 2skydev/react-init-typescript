import React from 'react';

import { BackTopProps, Button, Upload as AntUpload, UploadProps } from 'antd';
import { FormikContext } from 'formik';

import strapiAxios from '@web/shared/apis';
import { IAnyObject } from '@web/shared/types/etc';

import FormField from './FormField';

interface IUpload extends UploadProps {
  label: string;
  name: string;
  beforeUpload?: any;
}

export default function Upload({
  label,
  name,
  beforeUpload,
  ...AntUploaddProps
}: IUpload) {
  const formik = React.useContext(FormikContext);
  const error = formik.errors[name];

  return (
    <FormField label={label} error={error ? (error as string) : ''}>
      <AntUpload
        action="http://192.168.0.64:1337/upload"
        listType="picture"
        beforeUpload={() => (beforeUpload ? true : false)}
        onChange={(e: any) => {
          formik.setFieldValue(name, e.fileList);
        }}
        name="files"
        customRequest={async ({ file, onProgress, onSuccess }: IAnyObject) => {
          if (beforeUpload) {
            const formData = new FormData();

            formData.append('files', file);

            try {
              const res = await strapiAxios.post('upload', formData, {
                onUploadProgress: ({
                  loaded,
                  total,
                }: {
                  loaded: number;
                  total: number;
                }) => {
                  onProgress({ percent: (loaded / total) * 100 });
                },
              });

              console.log(res);

              onSuccess();
            } catch (error) {
              console.log(error);
            }
          }
        }}
        {...AntUploaddProps}
      >
        <Button>업로드</Button>
      </AntUpload>
    </FormField>
  );
}
