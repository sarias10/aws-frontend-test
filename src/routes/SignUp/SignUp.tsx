import { ChangeEvent, useContext, useState } from 'react';
import { SignupType } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading/Loading';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';

export const SignUp = () => {
    const [ formData, setFormData ] = useState<SignupType>({
        username: '',
        name: '',
        password: '',
    });
    const [ isLoading, setIsLoading ] = useState(false); // Estado para controlar la carga
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    if(!authContext){
        throw new Error('Error al cargar Authcontext en SignUp');
    };

    const { signup } = authContext;

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            setIsLoading(true); // Activa el estado de carga
            await signup(formData);
            setIsLoading(false); // Desactiva el estado de carga
            setFormData({
                username: '',
                name: '',
                password: '',
            });
            toast.success('Sign up successfully');
            navigate('/login');
        }catch(error){
            console.error(error);
            setIsLoading(false); // Desactiva el estado de carga en caso de error
        }
    };

    const handleLogin = () => {
        navigate('/accounts/login');
    };

    if (isLoading) return <Loading/>;

    return (
        <>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
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
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            onChange={handleChange}
                            value={formData.name}
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

                    <button>Sign Up</button>
                </form>
            </fieldset>
            <fieldset>
                <p>Have an account?</p>
                <p onClick={handleLogin}>Log in</p>
            </fieldset>
        </>
    );
};
