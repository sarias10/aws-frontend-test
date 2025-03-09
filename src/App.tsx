import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Login } from './routes/Login/Login';
import { SignUp } from './routes/SignUp/SignUp';
import { PageNotFound } from './routes/PageNotFound/PageNotFound';
import { NoteProvider } from './context/noteContext';
import { Home } from './routes/Home/Home';
import { AuthContextProvider } from './context/authContext';
import { Protected } from './utils/Protected';
import { UserProfile } from './routes/UserProfile/UserProfile';
import { Layout } from './components/Layout/Layout';
import { CreateNote } from './routes/CreateNote/CreateNote';
import { NotesByUser } from './routes/NotesByUser/NotesByUser';

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
