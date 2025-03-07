import { useNavigate } from 'react-router-dom';
import { NotesContainer } from '../NotesContainer/NotesContainer';
import { config } from '../../config/env';
export const Home = () => {
    const navigate = useNavigate();

    const handleLoginButton = () => {
        navigate('/login');
    };

    const handleSignUpButton = () => {
        navigate('/signup');
    };
    console.log(config.api_url);
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
