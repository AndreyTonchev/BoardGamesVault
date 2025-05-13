import { useLoaderData } from 'react-router';
import supabase from '../services/supabase';
import GameList from '../features/Games/GameList';
import { getGameDataFromId, getPopularGames } from '../utils/helpers';

function Home() {
    const games = useLoaderData();
    return <GameList data={games}>Popular games right now</GameList>;
}

export async function loader() {
    const popularGames = await getPopularGames();

    try {
        const gamePromises = popularGames
            .slice(0, 6)
            .map((id) => getGameDataFromId(id));
        const games = await Promise.all(gamePromises);

        return games;
    } catch (error) {
        console.error('Error fetching popular games:', games);
        return [];
    }
}

export default Home;
