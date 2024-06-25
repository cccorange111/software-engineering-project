import React, { lazy } from "react"
import { Navigate } from "react-router-dom"
import Home from '../views/Home/index'
import Login from '../views/Login/index'
import Register from '../views/Register/index'
import Blog from '../views/Blog/index'
const Page1 = lazy(() => import('../views/Home/Page1/index'))
const Page2 = lazy(() => import('../views/Home/Page2/index'))
const Page301 = lazy(() => import('../views/Home/Page301/index'))
const Page302 = lazy(() => import('../views/Home/Page302/index'))
const Page303 = lazy(() => import('../views/Home/Page303/index'))
const Page401 = lazy(() => import('../views/Home/Page401/index'))
const Page402 = lazy(() => import('../views/Home/Page402/index'))
const Article = lazy(() => import('../views/Blog/Article/index'));
const HomePage = lazy(() => import('../views/Blog/HomePage/index'));
const Catergoty = lazy(() => import('../views/Blog/Category/index'));
const Detail = lazy(() => import('../views/Blog/Detail/index'));
const withLoadingComponent = (comp: React.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)
export default [
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: 'page1',
                element: withLoadingComponent(<Page1 />)
            },
            {
                path: 'page2',
                element: withLoadingComponent(<Page2 />)
            },
            {
                path: 'page301',
                element: withLoadingComponent(<Page301 />)
            },
            {
                path: 'page302',
                element: withLoadingComponent(<Page302 />)
            },
            {
                path: 'page303',
                element: withLoadingComponent(<Page303 />)
            },
            {
                path: 'page401',
                element: withLoadingComponent(<Page401 />)
            },
            {
                path: 'page402',
                element: withLoadingComponent(<Page402 />)
            },

        ]
    },
    {
        path: '/blog',
        element: <Blog />,
        children: [
            {
                path: 'homepage',
                element: withLoadingComponent(< HomePage />)
            },
            {
                path: 'article',
                element: withLoadingComponent(<Article />)
            },
            {
                path: 'catergoty',
                element: withLoadingComponent(<Catergoty />)
            },
            {
                path: 'detail',
                element: withLoadingComponent(<Detail />)
            },

        ]
    },
    {
        path: '*',
        element: <Navigate to='/blog/homepage' />
    },
]



