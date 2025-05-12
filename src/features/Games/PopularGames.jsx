import { useLoaderData, useOutletContext } from 'react-router';
import { getGameDataFromId, getPopularGames } from '../../utils/helpers';
import GameCard from './GameCard';
import { processGames } from '../../utils/gamesSoring';

function PopularGames() {
    const games = useLoaderData();
    const { sort, filter } = useOutletContext();

    const sortedGames = processGames(games, sort, filter);

    return (
        <>
            <div className="text-2xl font-semibold text-gray-200">
                Popular games right now
            </div>
            <div className="m-5 grid w-[95%] grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {sortedGames.map((gameData, index) => (
                    <GameCard
                        gameData={gameData}
                        index={index + 1}
                        key={gameData.id}
                    />
                ))}
            </div>
        </>
    );
}

export async function loader() {
    const popularGames = await getPopularGames();

    try {
        const gamePromises = popularGames.map((id) => getGameDataFromId(id));
        const games = await Promise.all(gamePromises);

        return games;
    } catch (error) {
        console.error('Error fetching popular games:', games);
        return [];
    }
}

export default PopularGames;
