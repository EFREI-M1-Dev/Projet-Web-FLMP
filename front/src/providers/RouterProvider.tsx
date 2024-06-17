import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '../config/constants';

/* pages */
import Homepage from '../pages/Homepage';
import Chat from '../pages/Chat';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Homepage />,
  },
  {
    path: ROUTES.CHAT,
    element: <Chat />,
  },
]);
