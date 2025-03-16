import { useContext, useState } from 'react';
import { PostContext } from '../../context/postContext';
import { User } from '../../types/types';

export const Search = () => {
    const [ search, setSearch ] = useState<string>('');
    const [ filterUsers, setFilterUsers ] = useState<User[]>([]);

    const postContext = useContext(PostContext);

    if(!postContext){
        throw new Error('Error al cargar PostContext en Search');
    };

    const { users } = postContext;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);

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
        <>
            <input
                name="search"
                type="text"
                placeholder='Search...'
                onChange={handleChange}
                value={search}
            />
            {filterUsers && filterUsers.length > 0 ? (
                <ul>
                    {filterUsers.slice(0, 5).map((user) => ( // Mostrar solo los primeros 5 usuarios filtrados
                        <li key={user.id}>
                            <p>{user.username}</p>
                            <p style={{ color: 'gray' }}>{user.name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users to display</p>
            )}
        </>
    );
};
