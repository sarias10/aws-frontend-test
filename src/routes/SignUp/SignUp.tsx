import { ChangeEvent, useState } from 'react';
import { SignUpFormState } from '../../types/types';
import publicService from '../../services/public';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const [ formData, setFormData ] = useState<SignUpFormState>({
        username: '',
        name: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await publicService.signUp(formData);
            console.log(response);
            setFormData({
                username: '',
                name: '',
                password: '',
            });
            navigate('/login');
        }catch(error){
            console.error(error);
        }
    };
    const handleLogin = () => {
        navigate('/accounts/login');
    };
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
