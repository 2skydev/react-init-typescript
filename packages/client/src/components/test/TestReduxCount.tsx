import { useDispatch } from 'react-redux';

import { useRootSelector } from '~/hooks/useRootSelector';
import { increase, decrease } from '~/redux/slices/test';

export default function TestReduxCount() {
  const dispatch = useDispatch();
  const count = useRootSelector(state => state.test.count);

  return (
    <>
      <button
        onClick={() => {
          dispatch(decrease(100));
        }}
      >
        -
      </button>

      <span>{count}</span>

      <button
        onClick={() => {
          dispatch(increase(100));
        }}
      >
        +
      </button>
    </>
  );
}
