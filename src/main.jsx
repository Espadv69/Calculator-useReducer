import React from 'react'
import ReactDOM from 'react-dom/client'

import { Calculator } from './components/Calculator.jsx'
import './components/css/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
)
