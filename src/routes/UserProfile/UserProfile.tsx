import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import styles from './UserProfile.module.css';
import { CustomModal } from '../../components/CustomModal/CustomModal';

export const UserProfile = () => {
    const authContext = useContext(AuthContext);
    if(!authContext){
        throw new Error('Error al cargar login');
    };
    const { name } = authContext;
    return (
        <>
            <h2>User profile</h2>
            <h3>{name}</h3>
            <br/>
            <fieldset>
                <legend>Settigns</legend>
                <span>Activate private account: <button>true</button> <button className={styles['info-btn']} >i</button></span>
                <CustomModal/>
            </fieldset>
        </>

    );
};
