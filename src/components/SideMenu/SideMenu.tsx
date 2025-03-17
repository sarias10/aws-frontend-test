import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import styles from './SideMenu.module.css';
import { CreatePostModal } from '../CreatePostModal/CreatePostModal';
import { Search } from '../Search/Search';

export const SideMenu = () => {
    // Obtener el contexto de autenticación
    const authContex = useContext(AuthContext);
    // Estado para controlar si el desplegable de búsqueda está abierto
    const [ isSearchOpen, setIsSearchOpen ] = useState(false);

    const [ isCreateOpen, setIsCreateOpen ] = useState(false);

    const [ isPostModalOpen, setIsPostModalOpen ] = useState(false);

    // Referencias para el botón de búsqueda y el dropdown
    const searchRef = useRef<HTMLLIElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const createRef = useRef<HTMLLIElement>(null);
    const createDropdownRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    // Verificar si el contexto de autenticación está disponible
    if(!authContex){
        throw new Error('Error al cargar SideMenu');
    }

    const { username, logout } = authContex;

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        logout();
        navigate('/');
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

    const handleCreatePost = () => {
        setIsPostModalOpen(true);
        setIsCreateOpen(false);
    };

    const handleCloseModal = () => {
        setIsPostModalOpen(false);
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
                    <li onClick={() => navigate('/')} className={styles['div-logo']}>
                        InstagramDemake
                    </li>
                    <li onClick={() => navigate('/')}>
                        Home
                    </li>
                    <li ref={searchRef} onClick={toggleSearch} className={styles['searchStyles']}>
                        Search
                    </li>
                    {isSearchOpen && (
                        <Search ref={dropdownRef} />
                        // <div ref={dropdownRef} className={styles['dropdown']}>
                        // <Search />
                        // </div>
                    )}
                    <li onClick={() => navigate(`${username}`)}>Profile
                    </li>
                    <li ref={createRef} onClick={toggleCreate} className={styles['create-styles']}>
                        Create
                    </li>
                    {isCreateOpen && (
                        <div ref={createDropdownRef} className={styles['create-dropdown']}>
                            <li onClick={handleCreatePost}>Post</li>
                        </div>
                    )}

                    <li onClick={handleLogout}>Log out</li>

                    <CreatePostModal open={isPostModalOpen} onClose={handleCloseModal}/>
                </>
            </ul>
        </div>
    );
};
