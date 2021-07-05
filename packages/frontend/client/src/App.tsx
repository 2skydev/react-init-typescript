import Abc from './Abc';
import { SWRConfig } from 'swr';
import axios from 'shared/apis';
import Form from 'shared/components/form/Form';

function App() {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: url => axios.get(url),
      }}
    >
      <Abc />

      <Form />
    </SWRConfig>
  );
}

export default App;
