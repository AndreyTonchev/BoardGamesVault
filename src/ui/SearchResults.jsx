import { useLoaderData } from 'react-router';
import { getGameDataFromId, getGameIdsFromQuery } from '../utils/helpers';

function SearchResults() {
    const games = useLoaderData();

    console.log(games);

    return <div className="text-green-400">Hello</div>;
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
