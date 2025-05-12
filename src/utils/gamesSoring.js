export function sortGames(games, sort) {
    if (!games || !Array.isArray(games)) return [];

    if (sort === '') return games;

    const field = (sort?.field || '').toLowerCase();
    const direction = (sort?.direction || 'desc').toLowerCase();
    const isAsc = direction === 'asc';

    return [...games].sort((a, b) => {
        switch (field) {
            case 'name':
                return isAsc
                    ? (a.name || '').localeCompare(b.name || '')
                    : (b.name || '').localeCompare(a.name || '');

            case 'year':
                const yearA = parseInt(a.published) || 0;
                const yearB = parseInt(b.published) || 0;
                return isAsc ? yearA - yearB : yearB - yearA;

            case 'rating':
                const ratingA = parseFloat(a.rating) || 0;
                const ratingB = parseFloat(b.rating) || 0;
                return isAsc ? ratingA - ratingB : ratingB - ratingA;

            default:
                return 0;
        }
    });
}

export function filterGames(games, filter) {
    if (!games || !Array.isArray(games)) return [];
    if (!filter) return games;

    const filterLower = filter.toLowerCase();

    return games.filter((game) => {
        switch (filterLower) {
            case 'boardgame':
                return !game.type || game.type === 'boardgame';

            case 'expansion':
                return game.type === 'expansion';

            case 'accessory':
                return game.type === 'accessory';

            case 'users':
                return game.type === 'user';

            default:
                return true;
        }
    });
}

export function parseSortValue(value) {
    if (!value || typeof value !== 'string') {
        return { field: '', direction: '' };
    }

    const parts = value.split('_');
    if (parts.length !== 2) {
        return { field: '', direction: '' };
    }

    return {
        field: parts[0],
        direction: parts[1],
    };
}

export function processGames(games, sort, filter) {
    const filteredGames = filterGames(games, filter);
    return sortGames(filteredGames, sort);
}
