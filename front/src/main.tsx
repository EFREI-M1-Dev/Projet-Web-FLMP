import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './assets/styles/index.scss'

/* providers */
import { router } from './providers/RouterProvider'
import Pagelayout from './components/templates/PageLayout'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Pagelayout>
      <RouterProvider router={router} />
    </Pagelayout>
  </React.StrictMode>
)
