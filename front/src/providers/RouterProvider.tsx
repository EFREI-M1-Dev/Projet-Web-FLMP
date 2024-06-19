import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '../config/constants'

/* pages */

import Homepage from '../pages/Homepage'
import Chat from '../pages/Chat'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import NotFound from '../pages/NotFound'
import { setLoggedUser } from '../features/userConnected'
import AddContact from '../pages/AddContact'
import Pagelayout from '../components/templates/PageLayout'


/* export const router = createBrowserRouter([
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
  {
    path: ROUTES.ADD_CONTACT,
    element: <AddContact />,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace={true} />,
  },
]) */

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
    ],
  },
  {
    path: '*',
    element: <Navigate to="/404" replace={true} />,
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
    element: <Navigate to="/login" replace={true} />,
  },
])

const ActualRouter = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.user)

  dispatch(
    setLoggedUser({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaWNlIiwic3ViIjoxLCJpYXQiOjE3MTg4MDU0MDAsImV4cCI6MTcxODgwOTAwMH0.gSsF3WRpVKhgRAFaHleCWvDPHiPVaFtQ-fVk2jBs_j0',
      user: {
        id: 1,
        username: 'test',
        avatar: 'test',
      },
    })
  )

  return (
    <RouterProvider
      router={token.token ? router : authRouter}
      /* fallbackElement={<BigSpinner />} */
    />
  )
}

export default ActualRouter
