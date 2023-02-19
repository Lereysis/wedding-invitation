import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import router from './router/router';
import './styles/app.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
