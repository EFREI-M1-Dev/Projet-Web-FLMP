import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '../config/constants';

/* pages */
import Homepage from '../pages/Homepage';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Chat from '../pages/Chat';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Homepage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTES.CHAT,
    element: <Chat />,
  },

]);
