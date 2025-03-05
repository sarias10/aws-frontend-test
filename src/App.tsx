import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { Register } from './components/Register';

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
