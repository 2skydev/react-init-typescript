import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();
  return (
    <div>
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
