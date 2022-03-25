import React from 'react';
import ReactDOM from 'react-dom';
import MepCalculator from './components/calculator/MepCalculator';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <ChakraProvider>
    <React.StrictMode>

      <Provider store={store}>
        <MepCalculator />
      </Provider>

    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('rootContent')
);