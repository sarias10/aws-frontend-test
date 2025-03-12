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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route path='login' element={<Login/>} />
            <Route path='signup' element={<SignUp/>}/>
            <Route element={<Protected><Layout/></Protected>}>
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
            <PostProvider>
                <RouterProvider router={router}/>
            </PostProvider>
        </AuthContextProvider>
    );
};

export default App;
