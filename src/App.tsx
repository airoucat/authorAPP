import './assets/App.css';
import React from 'react';
import RootRoute from './router';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReactDOM from 'react-dom/client';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootRoute />
      </PersistGate>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
