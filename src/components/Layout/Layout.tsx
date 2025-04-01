import { SideMenu } from '../SideMenu/SideMenu';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import { DetailPostModal } from '../DetailPostModal/DetailPostModal';
import { SpreadModal } from '../SpreadModal/SpreadModal';

export const Layout = () => {
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
