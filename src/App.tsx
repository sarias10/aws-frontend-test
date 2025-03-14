import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Login } from './routes/Login/Login';
import { SignUp } from './routes/SignUp/SignUp';
import { PageNotFound } from './routes/PageNotFound/PageNotFound';
import { PostProvider } from './context/postContext';
import { Home } from './routes/Home/Home';
import { AuthContextProvider } from './context/authContext';
import { Protected } from './utils/Protected';
import { UserProfile } from './routes/UserProfile/UserProfile';
import { Layout } from './components/Layout/Layout';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route path='login' element={<Login/>} />
            <Route path='signup' element={<SignUp/>}/>
            <Route element={<Protected><PostProvider><Layout/></PostProvider></Protected>}>
                <Route index element={<Home/>} />
                <Route path='/user-profile' element={<UserProfile/>} />
            </Route>
            <Route path='*' element={<PageNotFound/>}/>
        </Route>
    )
);

const App = () => {
    return (
        <AuthContextProvider>
            <ToastContainer autoClose={2000}/>
            <RouterProvider router={router}/>
        </AuthContextProvider>
    );
};

export default App;
