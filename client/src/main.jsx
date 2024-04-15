import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>

);

/*
We are wrapping the App component in the PersistGate to ensure that the App does not load until 
the data fetch/reception is completed between the application and the browser storage by passing 
the persistor object it that we created earlier. I have set the loading value to null, 
but you can use this to implement loading screens/components before data is properly loaded into Redux from storage.
*/
