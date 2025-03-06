import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { SignUp } from './components/SignUp/SignUp';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { NoteProvider } from './context/noteContext';
import { Home } from './components/Home/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <SignUp />
    },
    {
        path: '*',
        element: <PageNotFound />
    },
]
);

const App = () => {
    return (
        <NoteProvider>
            <RouterProvider router={router} />
        </NoteProvider>
    );
};

export default App;
