import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
//create a client
const queryClient = new QueryClient()
//to be able to fetch the data we use "useQuery" and to update and delete we use "useMutation" 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider> 
    </BrowserRouter>
  </StrictMode>,
)
