// src/index.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './scss/index.scss'; // Import your SCSS file

const container = document.getElementById('root');
if (container) {
  container.classList.add('container'); // Add class to the root element
  const root = createRoot(container); // Create a root
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
