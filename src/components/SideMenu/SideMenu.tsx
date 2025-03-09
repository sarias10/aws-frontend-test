import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';
import styles from './SideMenu.module.css';
export const SideMenu = () => {
    const authContex = useContext(AuthContext);
    if(!authContex){
        throw new Error('Error al cargar SideMenu');
    }
    const { token, logout } = authContex;
    const handleLogout = () => {
        logout();
    };
    return (
        <div className={styles['side-menu']}>
            <ul>
                {token? (
                    <>
                        <li><Link to='/'>Public tweets</Link></li>
                        <li><Link to='/your-tweets'>Your tweets</Link></li>
                        <li><Link to='/create-tweet'>Create tweet</Link></li>
                        <li><Link to='user-profile'>User profile</Link></li>
                        <li onClick={handleLogout}><Link to='/'>Log out</Link></li>
                    </>
                ):(
                    <>
                        <li><Link to='/'>Public twits</Link></li>
                        <li><Link to='login'>Login</Link></li>
                        <li><Link to='signup'>Sign Up</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
};
