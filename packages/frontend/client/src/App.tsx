import Abc from './Abc'
import { SWRConfig } from 'swr'
import axios from 'shared/apis'


function App() {
  return (
    <SWRConfig value={{
      revalidateOnFocus: false,
      fetcher: url => axios.get(url)
    }}>
      <Abc />
    </SWRConfig>
  )
}

export default App
