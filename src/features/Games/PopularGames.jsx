import { useLoaderData, useOutletContext } from 'react-router';
import { getGameDataFromId, getPopularGames } from '../../utils/helpers';

import { processGames } from '../../utils/gamesSoring';
import GameList from './GameList';

function PopularGames() {
    const games = useLoaderData();
    const { sort, filter } = useOutletContext();

    const sortedGames = processGames(games, sort, filter);

    return <GameList data={sortedGames}>Popular games right now</GameList>;
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
