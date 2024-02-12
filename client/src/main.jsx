import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Homepage from './pages/Homepage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import App from './App.jsx'
import Upload from './pages/Upload.jsx'
import Results from './pages/Results.jsx'
import './index.css'

const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Homepage />
            },
            {
                path:'/login',
                element: <Login />
            },
            {
                path:'/signup',
                element: <Signup />
            },
            {
                path:'/upload',
                element: <Upload />
            },
            {
                path:'/results',
                element: <Results />
            },
            {
                path:'/results/?search',
                element: <Results />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
