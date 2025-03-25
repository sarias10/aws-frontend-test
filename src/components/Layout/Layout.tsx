import { SideMenu } from '../SideMenu/SideMenu';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { DetailPostModal } from '../DetailPostModal/DetailPostModal';
import { SpreadModal } from '../SpreadModal/SpreadModal';

export const Layout = () => {
    const authContext = useContext(AuthContext);
    if(!authContext){
        throw new Error('Error al cargar layout');
    };

    return (
        <div className={styles['layout-container']}>
            <SideMenu/> {/* Sidebar siempre visible */}
            <div className={styles['outlet-container']}>
                <Outlet/> {/* Aquí se renderizan las páginas */}
            </div>
            <DetailPostModal/> {/* El modal con el detalle de los post siempre va a estar disponible en todas las rutas*/}
            <SpreadModal/>

        </div>
    );
};
