import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import { Login } from './routes/Login/Login';
import { SignUp } from './routes/SignUp/SignUp';
import { PageNotFound } from './routes/PageNotFound/PageNotFound';
import { PostProvider } from './context/postContext';
import { Home } from './routes/Home/Home';
import { AuthContextProvider } from './context/authContext';
import { ProtectedRoutes } from './utils/ProtectedRoutes';
import { UserProfile } from './routes/UserProfile/UserProfile';
import { Layout } from './components/Layout/Layout';
import { ToastContainer } from 'react-toastify';
import { PublicRoutes } from './utils/PublicRoutes';
import { ModalProvider } from './context/modalContext';
import { SpreadModalProvider } from './context/spreadModalContext';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route element={<PublicRoutes><Outlet/></PublicRoutes>}>
                <Route path='accounts/login' element={<Login/>} />
                <Route path='accounts/signup' element={<SignUp/>}/>
            </Route>

            <Route element={<ProtectedRoutes><PostProvider><ModalProvider><SpreadModalProvider><Layout/></SpreadModalProvider></ModalProvider></PostProvider></ProtectedRoutes>}>

                <Route index element={<Home/>} />
                <Route path={':usernameParam'} element={<UserProfile/>} />
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
