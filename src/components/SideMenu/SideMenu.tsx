import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';
import styles from './SideMenu.module.css';
export const SideMenu = () => {
    // Obtener el contexto de autenticación
    const authContex = useContext(AuthContext);
    // Estado para controlar si el desplegable de búsqueda está abierto
    const [ isSearchOpen, setIsSearchOpen ] = useState(false);
    // Referencias para el botón de búsqueda y el dropdown
    const searchRef = useRef<HTMLLIElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Verificar si el contexto de autenticación está disponible
    if(!authContex){
        throw new Error('Error al cargar SideMenu');
    }

    const { token, logout } = authContex;

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        logout();
    };

    // Función para alternar la visibilidad del desplegable de búsqueda
    const toggleSearch = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsSearchOpen(!isSearchOpen);
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
                {token? (
                    <>
                        <li></li>
                        <li><Link to='/'>Home</Link></li>
                        <li ref={searchRef} onClick={toggleSearch}>Search</li>
                        {isSearchOpen && (
                            <div ref={dropdownRef}  className={styles['dropdown']}>
                                <input type="text" placeholder='Search...' />
                            </div>
                        )

                        }
                        <li><Link to='user-profile'>Profile</Link></li>

                        <li onClick={handleLogout}><Link to='/'>Log out</Link></li>
                    </>
                ):(
                    <>
                        <li><Link to='/'>Public tweets</Link></li>
                        <li><Link to='login'>Login</Link></li>
                        <li><Link to='signup'>Sign Up</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
};
