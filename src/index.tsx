import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import GuardianApp from './GuardianApp';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GuardianApp />
  </React.StrictMode>
);
