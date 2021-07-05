import React from 'react';

export default function Form() {
  const [state, setState] = React.useState('');

  if (!state) {
    setState('test');
  }

  return <div>테스트</div>;
}
