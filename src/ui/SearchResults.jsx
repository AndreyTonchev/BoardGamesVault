import { useLoaderData } from 'react-router';
import { getGameDataFromId, getGameIdsFromQuery } from '../utils/helpers';
import GameCard from './GameCard';

function SearchResults() {
    const games = useLoaderData();

    console.log(games);

    return (
        <>
            <div className="text-2xl font-semibold text-gray-200">
                {games.length} games matching the search
            </div>
            <div className="m-5 grid w-[95%] grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {games.map((gameData, index) => (
                    <GameCard
                        gameData={gameData}
                        index={index + 1}
                        key={index}
                    />
                ))}
            </div>
        </>
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
