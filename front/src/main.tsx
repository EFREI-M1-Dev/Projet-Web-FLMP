import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/index.scss'
import { Provider } from 'react-redux'

/* providers */
import Pagelayout from './components/templates/PageLayout'

/* store */
import { store } from './store'
import ActualRouter from './providers/RouterProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Pagelayout>
        <ActualRouter />
      </Pagelayout>
    </Provider>
  </React.StrictMode>
)
