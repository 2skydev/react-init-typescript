import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import _ from 'lodash';
import { SWRConfig } from 'swr';

import axios from 'shared/apis';

import Abc from './Abc';

function App() {
    return (
        <SWRConfig
            value={{
                revalidateOnFocus: false,
                fetcher: url => axios.get(url),
            }}
        >
            <BrowserRouter></BrowserRouter>
            <Abc />
        </SWRConfig>
    );
}

export default App;
