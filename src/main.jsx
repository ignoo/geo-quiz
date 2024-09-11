import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/globals.scss';
import Home from './pages/Home';
import FindCountries from './pages/games/FindCountries';

const router = createBrowserRouter([
  {
    path: '/geo-quiz',
    element: <Home />,
  },
  {
    path: '/find-countries',
    element: <FindCountries />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
