import { useLoaderData, useOutletContext } from 'react-router';
import { getGameDataFromId, getGameIdsFromQuery } from '../utils/helpers';
import GameCard from '../features/Games/GameCard';
import { processGames } from '../utils/gamesSoring';
import GameList from '../features/Games/GameList';

function SearchResults() {
    const games = useLoaderData();

    const { sort, filter } = useOutletContext();
    const sortedGames = processGames(games, sort, filter);

    return (
        <GameList
            data={sortedGames}
        >{`${sortedGames.length} games matching your seatch`}</GameList>
    );
}

export async function loader({ params }) {
    const searchResult = await getGameIdsFromQuery(params.query, 'search');

    try {
        const gamePromises = searchResult.map((id) => getGameDataFromId(id));

        const games = await Promise.all(gamePromises);

        return games;
    } catch (error) {
        console.error('Error fetching games: ', error);
        return [];
    }
}

export default SearchResults;
