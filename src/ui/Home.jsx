import { useLoaderData } from 'react-router';
import supabase from '../services/supabase';
import GameList from '../features/Games/GameList';
import { getGameDataFromId, getPopularGames } from '../utils/helpers';
import Review from '../features/Games/Review';

function Home() {
    const { games, followedReviews } = useLoaderData();
    return (
        <>
            <GameList data={games}>Popular games right now</GameList>;
            <span className="text-2xl font-semibold text-gray-200">
                Recent Reviews
            </span>
            <div className="w-[95%]">
                {followedReviews.map((review, index) => (
                    <Review data={review} external={true} key={index} />
                ))}
            </div>
        </>
    );
}

export async function loader() {
    try {
        const popularGames = await getPopularGames();

        const {
            data: { session },
        } = await supabase.auth.getSession();

        const gamePromises = popularGames
            .slice(0, 6)
            .map((id) => getGameDataFromId(id));
        const games = await Promise.all(gamePromises);

        if (!session) {
            return {
                games,
                followedReviews: [],
            };
        }

        const { data: followedUsers, error: followedError } = await supabase
            .from('user_follows')
            .select('followed_id')
            .eq('follower_id', session.user.id);

        if (followedError) throw followedError;

        const followedIds = followedUsers.map((user) => user.followed_id);

        const { data: reviews, error: reviewsError } = await supabase
            .from('user_content')
            .select('*')
            .in('user_id', followedIds)
            .order('created_at', { ascending: false })
            .limit(5);

        if (reviewsError) throw reviewsError;

        const followedReviews = reviews || [];

        return {
            games,
            followedReviews,
        };
    } catch (error) {
        console.error('Error fetching home page content:', games);
        return [];
    }
}

export default Home;
