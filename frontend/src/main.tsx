import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './app/styles/index.scss'
import 'rc-slider/assets/index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {BrowserRouter} from 'react-router-dom'
import {StoreProvider} from "@/app/providers/store/ui/StoreProvider";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
      <BrowserRouter>
          <StoreProvider>
              <App />
          </StoreProvider>
      </BrowserRouter>
  // </React.StrictMode>
,
)
