import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './SideMenu.module.css';
import { CreatePostModal } from '../CreatePostModal/CreatePostModal';
import { Search } from '../Search/Search';
import { usePost } from '../../context/postContext';

export const SideMenu = () => {

    // Estado para controlar si el desplegable de búsqueda está abierto
    const [ isSearchOpen, setIsSearchOpen ] = useState(false);

    const [ isCreateOpen, setIsCreateOpen ] = useState(false);

    const [ isPostModalOpen, setIsPostModalOpen ] = useState(false);

    const [ active, setActive ] = useState('home');

    // Referencias para el botón de búsqueda y el dropdown
    const searchRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const createRef = useRef<HTMLDivElement>(null);
    const createDropdownRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const { usernameParam } = useParams();

    const { username, logout } = useAuth();
    const { refreshVisiblePosts } = usePost();

    useEffect(() => {
        if (usernameParam === username) {
            setActive('profile');
        }
    }, [ usernameParam, username ]); // Se ejecuta cuando cambia usernameParam o username

    const handleLogoClick = () => {
        setActive('home');
        refreshVisiblePosts();
        navigate('/');
    };

    const handleHomeClick = () => {
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
        setActive('profile');
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        navigate(`${username}`);
    };

    const toggleCreate = () => {
        setIsCreateOpen(!isCreateOpen);
    };

    const handleCreatePost = () => {
        setActive('');
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
                setActive('');
            }
            if (
                createDropdownRef.current &&
                !createDropdownRef.current.contains(event.target as Node) &&
                createRef.current &&
                !createRef.current.contains(event.target as Node)
            ) {
                setIsCreateOpen(false);
                setActive('');
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
            <div onClick={handleLogoClick} className={styles['logo']}>
                Instagram demake
            </div>
            <div onClick={handleHomeClick} className={`${active === 'home' ? styles['active']: ''}`}>
                Home
            </div>
            <div ref={searchRef} onClick={toggleSearch} className={`${styles['searchStyles']} ${active === 'search'? styles['active']:''}`}>
                Search
            </div>
            {isSearchOpen && (
                <Search ref={dropdownRef} closeDropdown={() => setIsSearchOpen(false)}/>
            )}
            <div onClick={handleProfile} className={`${active === 'profile' ? styles['active']: ''}`}>
                Profile
            </div>
            <div
                ref={createRef}
                onClick={toggleCreate}
                className={`${styles['create-styles']}${active === 'create' ? styles['active']:''}`}
            >
                Create
                {isCreateOpen && (
                    <div ref={createDropdownRef} className={styles['create-dropdown']}>
                        <div onClick={handleCreatePost}>Post</div>
                    </div>
                )}
            </div>

            <div
                onClick={handleLogout}>
                Log out
            </div>

            <CreatePostModal open={isPostModalOpen} onClose={handleCloseModal}/>
        </div>
    );
};
