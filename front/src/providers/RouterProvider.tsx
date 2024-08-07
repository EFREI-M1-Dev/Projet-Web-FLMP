import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

/* config */
import { ROUTES } from '../config/constants'

/* pages */
import Homepage from '../pages/Homepage'
import Chat from '../pages/Chat'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import AddContact from '../pages/AddContact'

/* components */
import Pagelayout from '../components/templates/PageLayout'

/* hooks */
import { useAppSelector } from '../hooks/reduxHooks'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Pagelayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Homepage />,
      },
      {
        path: ROUTES.CHAT,
        element: <Chat />,
      },
      {
        path: ROUTES.ADD_CONTACT,
        element: <AddContact />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
      },
      {
        path: ROUTES.LOGIN,
        element: <Homepage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.NOT_FOUND} replace={true} />,
  },
])

export const authRouter = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.LOGIN} replace={true} />,
  },
])

const ActualRouter = () => {
  const token = useAppSelector((state) => state.user)

  return <RouterProvider router={token.token ? router : authRouter} />
}

export default ActualRouter
