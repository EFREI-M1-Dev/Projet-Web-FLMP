import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '../config/constants';

/* pages */
import Homepage from '../pages/Homepage';
import Chat from '../pages/Chat';
import Auth from '../pages/auth';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Homepage />,
  },
  {
    path: ROUTES.CHAT,
    element: <Chat />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Auth />,
  },
]);
