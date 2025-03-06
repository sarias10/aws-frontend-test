import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Layout } from './Layout/Layout';
import { Register } from './components/Register/Register';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { NoteProvider } from './context/noteContext';
import { NotesContainer } from './components/NotesContainer/NotesContainer';

const router = createBrowserRouter([
    {
        path: '/',
        element: <NotesContainer />
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
        <NoteProvider>
            <RouterProvider router={router} />
        </NoteProvider>
    );
};

export default App;
