import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Layout } from './Layout/Layout';
import { Register } from './components/Register/Register';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '*',
        element: <PageNotFound />
    },
]
);

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
