import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '../config/constants'

/* pages */

import Homepage from '../pages/Homepage'
import Chat from '../pages/Chat'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { useAppSelector } from '../hooks/reduxHooks'
import NotFound from '../pages/NotFound'
import AddContact from '../pages/AddContact'
import Pagelayout from '../components/templates/PageLayout'


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
  const token = useAppSelector((state) => state.user)

<<<<<<< HEAD
  dispatch(
    setLoggedUser({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaWNlIiwic3ViIjoxLCJpYXQiOjE3MjA1OTUxODIsImV4cCI6MTcyMDU5ODc4Mn0.-0uDPJXwkOEqEtTCKcTphn2JG4k8TBFF5UcfczwsemU',
      user: {
        id: 1,
        username: 'test',
        avatar: 'test',
      },
    })
  )

=======
>>>>>>> f5f808f (feat(login) : WIP but adding the capacity to create and log in your account)
  return (
    <RouterProvider
      router={token.token ? router : authRouter}
    />
  )
}

export default ActualRouter
