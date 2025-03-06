import { useNavigate } from 'react-router-dom';
import { NotesContainer } from '../NotesContainer/NotesContainer';
export const Home = () => {
    const navigate = useNavigate();

    const handleLoginButton = () => {
        navigate('/login');
    };

    const handleSignUpButton = () => {
        navigate('/register');
    };
    return (
        <div>
            <button onClick={handleLoginButton}>
                login
            </button>
            <br/>
            <button onClick={handleSignUpButton}>
                sign up
            </button>
            <NotesContainer/>
        </div>
    );
};
