import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { SignUp } from './components/SignUp/SignUp';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { NoteProvider } from './context/noteContext';
import { Home } from './components/Home/Home';
import { AuthContextProvider } from './context/authContext';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route index element={<Home/>} />
            <Route path='login' element={<Login/>} />
            <Route path='signup' element={<SignUp/>}/>
            <Route path='*' element={<PageNotFound/>}/>
        </Route>
    )
);

const App = () => {
    return (
        <AuthContextProvider>
            <NoteProvider>
                <RouterProvider router={router}/>
            </NoteProvider>
        </AuthContextProvider>
    );
};

export default App;
