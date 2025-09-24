// FIX: Add imports for React, ReactDOM, App, and LanguageProvider to satisfy the TypeScript compiler.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { LanguageProvider } from './contexts/LanguageContext';

// All dependencies like React, ReactDOM, App, and LanguageProvider are loaded
// via script tags in index.html and are available globally.

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);