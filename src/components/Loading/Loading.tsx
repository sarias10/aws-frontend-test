import styles from './Loading.module.css';

// Componente Loading que muestra un spinner y un mensaje opcional
export const Loading = ({ message = 'Loading...' }) => {
    return (
        <div className={styles['loading-container']}>
            <div className={styles['spinner']}></div>
            <p>{message}</p>
        </div>
    );
};
