import { useHistory } from 'react-router-dom';

export default function Test() {
  const history = useHistory();
  return (
    <div>
      test
      <button
        onClick={() => {
          history.push(`/test`);
        }}
      >
        we go test
      </button>
      <button
        onClick={() => {
          history.push(`/`);
        }}
      >
        wo go main
      </button>
    </div>
  );
}
