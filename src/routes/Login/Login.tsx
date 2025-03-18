import { ChangeEvent, useContext, useState } from 'react';
import { LoginType } from '../../types/types';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading/Loading';
export const Login = () => {
    const [ formData, setFormData ] = useState<LoginType>({
        username: '',
        password: '',
    });
    const [ isLoading, setIsLoading ] = useState(false); // Estado para controlar la carga
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    if(!authContext){
        throw new Error('Error al cargar Authcontext en login');
    };

    const { login } = authContext;

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            setIsLoading(true); // Activa el estado de carga
            await login(formData);
            setIsLoading(false); // Desactiva el estado de carga
            setFormData({
                username: '',
                password: '',
            });
            navigate('/');
        }catch(error){
            console.error(error);
            setIsLoading(false); // Desactiva el estado de carga en caso de error
        }
    };

    const handleSignup = () => {
        navigate('/accounts/signup');
    };

    if (isLoading) return <Loading/>; // Muestra el componente Loading mientras está cargando

    return (
        <>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div>
                        <label htmlFor='username'>Username:</label>
                        <input
                            type='text'
                            name='username'
                            id='username'
                            onChange={handleChange}
                            value={formData.username}
                            required
                            maxLength={40}
                        />
                    </div>

                    <div>
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            onChange={handleChange}
                            value={formData.password}
                            required
                            maxLength={40}
                        />
                    </div>

                    <button>Log in</button>
                </form>
            </fieldset>

            <fieldset>
                <p>Don't have an account? </p>
                <p onClick={handleSignup}>Sign up</p>
            </fieldset>

        </>
    );
};