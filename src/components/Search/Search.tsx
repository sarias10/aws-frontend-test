import { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { PostContext } from '../../context/postContext';
import { User } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.css';

interface SearchProps {
    closeDropdown: () => void;
}
export const Search = forwardRef<HTMLDivElement, SearchProps>(({ closeDropdown },ref) => {
    const [ search, setSearch ] = useState<string>('');
    const [ filterUsers, setFilterUsers ] = useState<User[]>([]);
    const [ selectedIndex, setSelectedIndex ] = useState<number>(-1); // Índice seleccionado

    const navigate = useNavigate();
    const postContext = useContext(PostContext);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Enfoca el input automáticamente cuando se abre el dropdown
        if(inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    if(!postContext){
        throw new Error('Error al cargar PostContext en Search');
    };

    const { users } = postContext;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.target.value;
        setSearch(value);
        setSelectedIndex(-1); //Reiniciar selección al cambiar el texto

        if (value === '') {
            setFilterUsers([]); // Si el campo de búsqueda está vacío, el filtro se resetea
            return;
        }

        // Filtrar usuarios que coincidan con username o name (case-insensitive)
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(value.toLowerCase()) ||
            user.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilterUsers(filtered);
    };

    const handleSearchLiClick = (username: string) => {
        navigate(`/${username}`);
        closeDropdown(); // Cerrar el dropdown al hacer click en un li
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(!filterUsers.length) return;

        if(event.key === 'ArrowDown') {
            event.preventDefault();
            setSelectedIndex((prevIndex) =>
                prevIndex < filterUsers.length -1 ? prevIndex + 1 : 0
            );
        }

        if(event.key === 'ArrowUp') {
            event.preventDefault();
            setSelectedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex -1 : filterUsers.length -1
            );
        }

        if(event.key === 'Enter' && selectedIndex >=0) {
            event.preventDefault();
            handleSearchLiClick(filterUsers[selectedIndex].username);
        }
    };

    /*
    Método .slice(): Explicación

    - .slice(start,end)

    - .slice() crea una copia superficial de un array, seleccionando elementos entre el índice start (inclusivo) y el índice end (exclusivo).

    - No modifica el array original.

    - Si se omite end, devuelve todos los elementos desde el índice start hasta el final del array.

    - Los índices negativos cuentan desde el final del array.

    Ejemplo:

    const arr = [1, 2, 3, 4, 5];
    console.log(arr.slice(0, 3)); // Output: [1, 2, 3]
    */
    return (
        <div ref={ref} className={styles['dropdown']}>
            <h1>Search</h1>
            <input
                ref={inputRef} // Referencia al input para poner el foco en el
                name="search"
                type="text"
                placeholder='Search...'
                autoComplete="off"  // Desactiva el autocompletado del navegador
                onChange={handleChange}
                value={search}
                onKeyDown={handleKeyDown}
            />
            {filterUsers && filterUsers.length > 0 ? (
                <ul>
                    {filterUsers.slice(0, 5).map((user, index) => ( // Mostrar solo los primeros 5 usuarios filtrados
                        <li
                            key={user.id}
                            onClick={() => handleSearchLiClick(user.username)}
                            className={selectedIndex === index ? styles['selected'] : ''}
                        >
                            <p>{user.username}</p>
                            <p style={{ color: 'gray' }}>{user.name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles['no-users-to-display']}>No users to display</div>
            )}
        </div>
    );
});
