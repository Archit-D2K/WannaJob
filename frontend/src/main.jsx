import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'  // Use createRoot directly from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from './Components/ui/sonner.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store);

// Use createRoot directly without ReactDOM
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
