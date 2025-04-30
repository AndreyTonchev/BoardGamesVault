import { useLoaderData } from 'react-router';
import { getGameDataFromId, getGameIdsFromQuery } from '../utils/helpers';
import GameCard from './GameCard';

function SearchResults() {
    const games = useLoaderData();

    console.log(games);

    return (
        <ul className="space-y-10">
            {games.map((gameData) => (
                <GameCard gameData={gameData} />
            ))}
        </ul>
    );
}

export async function loader({ params }) {
    const searchResult = await getGameIdsFromQuery(params.query);

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
