import { useState } from 'react';

import { Button } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Form,
  Input,
  Select,
  CheckBox,
  Radio,
  DatePicker,
  RangePicker,
} from '@web/shared/components/form/Form';
import Modal from '@web/shared/components/modal/Modal';
import UseConfirm from '@web/shared/components/modal/UseConfirm';

export default function FormTest() {
  const { confirm } = UseConfirm();
  const [open, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '123',
      select: 'test1',
      checkbox: 'test1',
      radio: 'test2',
    },
    onSubmit: async values => {
      return 'test';
    },
    validationSchema: yup.object({
      email: yup
        .number()
        .typeError('테스트')
        .required('아이디는 숫자만 입력 가능'),
      select: yup.string().required(),
    }),
  });

  const options = [
    {
      label: 'test1',
      value: 'test1',
    },
    {
      label: 'test2',
      value: 'test2',
    },
  ];

  const openConfirm = () => {
    confirm({
      content: <div>aslkdfjalksdjflk</div>,
      onOk: () => {
        return new Promise(res => {
          setTimeout(() => {
            res('success');
          }, 1000);
        });
      },
    });
  };

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <br />
      <br />
      <Button type="primary" onClick={openConfirm}>
        Open Confirm
      </Button>

      <Modal
        title="타이틀"
        open={open}
        onClose={() => setOpen(false)}
        submit={formik.submitForm}
        footer={[<Button key="back">테스트</Button>]}
      >
        asdkfjalksdjf
      </Modal>

      <Form formik={formik}>
        <Input
          label="아이디"
          name="email"
          helperText="아이디는 숫자 형식으로 입력해주세요"
        />
        <Select name="select" options={options} helperText="선택해주세요" />
        <CheckBox
          name="checkbox"
          options={options}
          helperText="한개이상 선택"
        />
        <Radio name="radio" options={options} helperText="한개이상 선택" />
        <DatePicker name="date" />
        <RangePicker name="term" />

        <button>submit</button>
      </Form>
    </div>
  );
}
