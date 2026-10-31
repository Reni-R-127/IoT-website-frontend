/**
 * File: website-frontend/src/main.jsx
 *
 * Purpose:
 * Main entry point for the IoT website frontend.
 *
 * Features:
 * - React application initialization
 * - React StrictMode
 * - BrowserRouter navigation
 * - React Router v7 future flags
 * - Global application CSS
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./styles/App.css";


// ======================================================
// ROOT ELEMENT
// ======================================================

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Root element "#root" was not found in index.html.'
  );
}


// ======================================================
// RENDER APPLICATION
// ======================================================

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);