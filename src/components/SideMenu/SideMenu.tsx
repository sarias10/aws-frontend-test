import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './SideMenu.module.css';
import { CreatePostModal } from '../CreatePostModal/CreatePostModal';
import { Search } from '../Search/Search';
import { usePost } from '../../context/postContext';

export const SideMenu = () => {

    // Estado para controlar si el desplegable de búsqueda está abierto
    const [ isSearchOpen, setIsSearchOpen ] = useState(false);

    const [ isCreateOpen, setIsCreateOpen ] = useState(false);

    const [ isPostModalOpen, setIsPostModalOpen ] = useState(false);

    const [ active, setActive ] = useState('home'); // Este estado me dice cual de los botones esta en negrita

    // Referencias para el botón de búsqueda y el dropdown
    const searchRef = useRef<HTMLDivElement>(null);
    const dropdownSearchRef = useRef<HTMLDivElement>(null);

    const createRef = useRef<HTMLDivElement>(null);
    const createDropdownRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const location = useLocation();

    const { usernameParam } = useParams();

    const { username, logout } = useAuth();
    const { refreshVisiblePosts } = usePost();

    useEffect(() => {
        if (usernameParam === username) {
            setActive('profile');
        }
    }, [ usernameParam, username ]); // Se ejecuta cuando cambia usernameParam o username

    const handleLogoClick = () => {
        setIsSearchOpen(false);
        setIsCreateOpen(false);
        setActive('home');
        refreshVisiblePosts();
        navigate('/');
    };

    const handleHomeClick = () => {
        setIsSearchOpen(false);
        setIsCreateOpen(false);
        setActive('home');
        refreshVisiblePosts();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        navigate('/');
    };

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        setActive('');
        logout();
        navigate('/');
    };

    // Función para alternar la visibilidad del desplegable de búsqueda
    const toggleSearch = () => {
        setActive('search');
        setIsSearchOpen(!isSearchOpen);
    };

    const handleProfile = () => {
        setIsSearchOpen(false);
        setIsCreateOpen(false);
        setActive('profile');
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        navigate(`${username}`);
    };

    const toggleCreate = () => {
        setIsSearchOpen(false);
        setIsCreateOpen(!isCreateOpen);
    };

    const handleCreatePost = () => {
        setIsSearchOpen(false);
        setIsCreateOpen(false);
        setIsPostModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsPostModalOpen(false);
    };

    // Cerrar el dropdown si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            // Cuando usas un atributo data-* en HTML, JavaScript lo convierte en una propiedad del objeto dataset del elemento.
            // Si el click fue en un botón (data-button="true"), no cerrar
            if (target.dataset.button === 'true') {
                return;
            }

            // Verificar si el click fue fuera del dropdown y del botón de búsqueda
            if (
                dropdownSearchRef.current &&
                !dropdownSearchRef.current.contains(event.target as Node) &&
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsSearchOpen(false);

                if (location.pathname === '/') {
                    setActive('home');
                } else if (username && location.pathname === `/${username}`) {
                    setActive('profile');
                } else {
                    setActive('');
                }

            }
            if (
                createDropdownRef.current &&
                !createDropdownRef.current.contains(event.target as Node) &&
                createRef.current &&
                !createRef.current.contains(event.target as Node)
            ) {
                setIsCreateOpen(false);

                if (location.pathname === '/') {
                    setActive('home');
                } else if (username && location.pathname === `/${username}`) {
                    setActive('profile');
                } else {
                    setActive('');
                }
            }
        };

        // Agregar el event listener al montar el componente
        document.addEventListener('mousedown', handleClickOutside);
        // Limpiar el event listener al desmontar el componente
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ active, location.pathname, username ]);

    return (
        <div
            className={styles['side-menu']}>
            <div
                data-button="true"
                onClick={handleLogoClick}
                className={`
                    ${styles['logo']}
                    ${styles['option']}`}>
                Instagram demake
            </div>
            <div
                data-button="true"
                onClick={handleHomeClick}
                className={`
                    ${active === 'home' ? styles['active']: ''}
                    ${styles['option']}`}>
                Home
            </div>
            <div className={styles['div-search']}>
                <div
                    data-button="true"
                    ref={searchRef}
                    onClick={toggleSearch}
                    className={`
                        ${styles['search-button']}
                        ${active === 'search'? styles['active']:''}
                        ${styles['option']}`}
                >
                    Search
                </div>
                {isSearchOpen && (
                    <Search ref={dropdownSearchRef} closeDropdown={() => setIsSearchOpen(false)}/>
                )}
            </div>
            <div
                data-button="true"
                onClick={handleProfile}
                className={`
                    ${active === 'profile' ? styles['active']: ''}
                    ${styles['option']}`}
            >
                Profile
            </div>
            <div className={styles['div-create']}>
                <div
                    data-button="true"
                    ref={createRef}
                    onClick={toggleCreate}
                    className={`
                    ${styles['button-create']}
                    ${active === 'create' ? styles['active']:''}
                    ${styles['option']}`}
                >
                    Create
                </div>
                {isCreateOpen && (
                    <div ref={createDropdownRef} className={styles['create-dropdown']}>
                        <div
                            data-button="true"
                            onClick={handleCreatePost}>Post</div>
                    </div>
                )}
            </div>

            <div
                data-button="true"
                onClick={handleLogout}
                className={styles['option']}
            >
                Log out
            </div>

            <CreatePostModal open={isPostModalOpen} onClose={handleCloseModal}/>
        </div>
    );
};
