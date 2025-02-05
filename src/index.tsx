import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AuthProvider } from './providers/AuthProvider';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <>
    <AuthProvider>
      <App />
    </AuthProvider>
  </>,
);
