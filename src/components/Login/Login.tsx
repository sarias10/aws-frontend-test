import { ChangeEvent, useContext, useState } from 'react';
import { LoginType } from '../../types/types';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [ formData, setFormData ] = useState<LoginType>({
        username: '',
        password: '',
    });
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    if(!authContext){
        throw new Error('');
    };

    const { login } = authContext;
    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        try{
            e.preventDefault();
            await login(formData);
            setFormData({
                username: '',
                password: '',
            });
            navigate('/');
        }catch(error){
            console.error(error);
        }
    };
    return (
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

            <button>Login</button>
        </form>
    );
};