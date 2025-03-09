import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { SignUp } from './components/SignUp/SignUp';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { NoteProvider } from './context/noteContext';
import { Home } from './components/Home/Home';
import { AuthContextProvider } from './context/authContext';
import { Protected } from './routes/Protected';
import { UserProfile } from './components/User/UserProfile';
import { Layout } from './components/Layout/Layout';
import { CreateNote } from './components/CreateNote/CreateNote';
import { NotesByUser } from './components/NotesByUser/NotesByUser';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path='login' element={<Login/>} />
            <Route path='signup' element={<SignUp/>}/>
            <Route element={<Protected/>}>
                <Route path='/user-profile' element={<UserProfile/>} />
                <Route path='/create-tweet' element={<CreateNote/>} />
                <Route path='/your-tweets' element={<NotesByUser/>} />
            </Route>
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
