import { useDispatch } from 'react-redux';

import { Button, Space, Tag } from 'antd';

import { useRootSelector } from '~/hooks/useRootSelector';
import { increase, decrease } from '~/redux/slices/test';

export default function TestReduxCount() {
  const dispatch = useDispatch();
  const count = useRootSelector(state => state.test.count);

  return (
    <Space>
      <Button
        onClick={() => {
          dispatch(decrease(100));
        }}
      >
        -
      </Button>

      <Tag color="blue" style={{ marginRight: 0 }}>
        {count}
      </Tag>

      <Button
        onClick={() => {
          dispatch(increase(100));
        }}
      >
        +
      </Button>
    </Space>
  );
}
