import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from './chat/Login';
import Chat from './chat/Chat';

// lista-compras?nome=Lucas

const router = createBrowserRouter([
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/Chat',
        element: <Chat />,
      },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
