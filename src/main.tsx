import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DataExplorerPage } from './pages/DataExplorerPage';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataExplorerPage />
  </StrictMode>,
);
