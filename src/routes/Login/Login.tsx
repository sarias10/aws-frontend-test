import { ChangeEvent, useState } from 'react';
import { LoginType } from '../../types/types';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading/Loading';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import styles from './Login.module.css';

export const Login = () => {
    const [ formData, setFormData ] = useState<LoginType>({
        username: '',
        password: '',
    });

    const [ isLoading, setIsLoading ] = useState(false); // Estado para controlar la carga

    const navigate = useNavigate();

    const { login } = useAuth();

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
            toast.success('Log in successfully!');
            navigate('/');
        }catch(error){
            setIsLoading(false); // Desactiva el estado de carga en caso de error
            if (error instanceof AxiosError && error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };

    if (isLoading) return <Loading/>; // Muestra el componente Loading mientras está cargando

    return (
        <div className={styles['login-container']}>
            <fieldset className={styles['login-box']}>
                <form onSubmit={handleSubmit} className={styles['login-form']}>
                    <h1 className={styles['logo']}>Login</h1>
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
                            className={styles['input']}
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
                            className={styles['input']}
                        />
                    </div>

                    <button className={styles['login-button']}>Log in</button>
                </form>
            </fieldset>

            <fieldset className={styles['signup-box']}>
                <p>Don't have an account? </p>
                <Link to='/accounts/signup' className={styles['signup-link']}>Sign up</Link>
            </fieldset>
        </div>
    );
};