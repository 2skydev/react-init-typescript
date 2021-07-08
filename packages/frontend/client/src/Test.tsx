import SampleImage from 'client/src/assets/sample.png';
import SampleVideo from 'client/src/assets/video.mp4';

import React from 'react';
import { useState } from 'react';
import ReactPlayer from 'react-player';

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
} from 'shared/components/form/Form';

export const Test = () => {
  const [playing, setPlaying] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      select: 'test1',
      checkbox: 'test1',
      radio: 'test2',
      date: '',
      term: [],
    },
    onSubmit: values => {
      alert(JSON.stringify(values));
    },
    validationSchema: yup.object({
      email: yup
        .number()
        .typeError('테스트')
        .required('아이디는 숫자만 입력 가능'),
      select: yup.string().required(),
      checkbox: yup.array().min(1, '2개이상 선택'),
      date: yup.string().typeError('타입에러').required('날짜 선택'),
      term: yup.array().min(2, '기간 선택 에러').required(),
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

  return (
    <div>
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

      <div className="videoBox">
        <div className="video">
          <ReactPlayer
            playsinline={true}
            url={SampleVideo}
            onPlay={() => {
              console.log('play');
            }}
            onPause={() => {
              console.log('pause');
            }}
            onEnded={() => {
              console.log('end');
            }}
            onSeek={() => {
              console.log('error');
              alert('잘못된 방식 영상 재시청');
            }}
            playing={playing}
          />
        </div>

        <button onClick={() => setPlaying(true)}>PLAY</button>
        <button onClick={() => setPlaying(false)}>PAUSE</button>
      </div>
    </div>
  );
};
