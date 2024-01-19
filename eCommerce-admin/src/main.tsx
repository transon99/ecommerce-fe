import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from '@/App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Theme appearance='dark'>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Theme>
)
