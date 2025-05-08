import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';

function SearchBar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (!query) return;
        navigate(`/games/${query}`);
        setQuery('');
    }

    return (
        <form
            className="container flex w-[50%] items-center gap-2"
            onSubmit={(e) => handleSubmit(e)}
        >
            <input
                className="w-full outline-none"
                type="text"
                placeholder="Search for a game or user"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">
                <FaSearch />
            </button>
        </form>
    );
}

export default SearchBar;
