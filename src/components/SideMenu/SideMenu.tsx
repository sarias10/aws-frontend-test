import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';
import styles from './SideMenu.module.css';

export const SideMenu = () => {
    // Obtener el contexto de autenticación
    const authContex = useContext(AuthContext);
    // Estado para controlar si el desplegable de búsqueda está abierto
    const [ isSearchOpen, setIsSearchOpen ] = useState(false);

    const [ isCreateOpen, setIsCreateOpen ] = useState(false);
    // Referencias para el botón de búsqueda y el dropdown
    const searchRef = useRef<HTMLLIElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const createRef = useRef<HTMLLIElement>(null);
    const createDropdownRef = useRef<HTMLDivElement>(null);

    // Verificar si el contexto de autenticación está disponible
    if(!authContex){
        throw new Error('Error al cargar SideMenu');
    }

    const { logout } = authContex;

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        logout();
    };

    // Función para alternar la visibilidad del desplegable de búsqueda
    const toggleSearch = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsSearchOpen(!isSearchOpen);
    };

    const toggleCreate = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsCreateOpen(!isCreateOpen);
    };

    // Cerrar el dropdown si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Verificar si el clic fue fuera del dropdown y del botón de búsqueda
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsSearchOpen(false);
            }
            if (
                createDropdownRef.current &&
                !createDropdownRef.current.contains(event.target as Node) &&
                createRef.current &&
                !createRef.current.contains(event.target as Node)
            ) {
                setIsCreateOpen(false);
            }
        };

        // Agregar el event listener al montar el componente
        document.addEventListener('mousedown', handleClickOutside);
        // Limpiar el event listener al desmontar el componente
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className={styles['side-menu']}>
            <ul>
                <>
                    <div className={styles['div-logo']}>
                        <li><Link to='/'>InstagramDemake</Link></li>
                    </div>
                    <div className={styles['div-other-options']}>
                        <li><Link to='/'>Home</Link></li>
                        <li ref={searchRef} onClick={toggleSearch} className={styles['searchStyles']}>Search</li>
                        {isSearchOpen && (
                            <div ref={dropdownRef} className={styles['dropdown']}>
                                <input type="text" placeholder='Search...' />
                            </div>
                        )
                        }
                        <li><Link to='user-profile'>Profile</Link></li>
                        <li ref={createRef} onClick={toggleCreate} className={styles['createStyles']}>Create</li>
                        {isCreateOpen && (
                            <div ref={createDropdownRef} className={styles['createDropdown']}>
                                <li>Post</li>
                                <li>Story</li>
                            </div>
                        )
                        }
                        <li onClick={handleLogout}><Link to='/'>Log out</Link></li>
                    </div>
                </>
            </ul>
        </div>
    );
};
