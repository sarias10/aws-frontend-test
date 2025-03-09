import { SideMenu } from '../SideMenu/SideMenu';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export const Layout = () => {
    return (
        <div className={styles['layout-container']}>
            <SideMenu/> {/* Sidebar siempre visible */}
            <div className={styles['outlet-container']}>
                <Outlet/> {/* Aquí se renderizan las páginas */}
            </div>
        </div>
    );
};
