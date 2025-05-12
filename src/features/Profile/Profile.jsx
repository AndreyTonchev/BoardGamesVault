import { redirect, useLoaderData, useNavigate } from 'react-router';
import supabase from '../../services/supabase';
import Button from '../../ui/Button';
import Stats from './Stats';
import { useEffect, useState } from 'react';
import InputField from '../../ui/InputField';
import EditProfile from './EditProfile';
import GameList from '../Games/GameList';
import { getGameDataFromId } from '../../utils/helpers';

function Profile() {
    const data = useLoaderData();
    const [editToggle, setEditToggle] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState('owned');
    console.log(data.collections);
    return (
        <div className="w-[95%] text-neutral-200">
            <section className="container flex flex-col gap-6 p-6">
                <header className="flex justify-between">
                    <div className="flex items-center justify-center gap-4">
                        <img
                            className="h-25 rounded-full"
                            src={
                                data.profile.avatar_url ||
                                '../../default_avatar.jpg'
                            }
                        />
                        <div>
                            <h2 className="text-2xl font-semibold">
                                {data.profile.display_name}
                            </h2>
                            <h3 className="text-sm text-neutral-500">
                                @{data.profile.username}
                            </h3>
                        </div>
                    </div>
                    {data.user.id === data.profile.id ? (
                        <Button onClick={() => setEditToggle(!editToggle)}>
                            Edit Profile
                        </Button>
                    ) : (
                        <Button>Add Friend</Button>
                    )}
                </header>
                {<span>{data.profile.bio}</span>}
                <div className="flex justify-around border-t-1 border-neutral-600 p-6">
                    <Stats value={data.collections.owned.length}>
                        Games Owned
                    </Stats>
                    <Stats value={data.collections.played.length}>
                        Games Played
                    </Stats>
                    <Stats value={data.collections.liked.length}>
                        Games Liked
                    </Stats>
                    <Stats value={data.collections.wishlist.length}>
                        Wishlist
                    </Stats>
                </div>
            </section>
            {editToggle && (
                <EditProfile profile={data.profile} toggle={setEditToggle} />
            )}
            <section className="container flex flex-col gap-6 p-6">
                <div className="flex flex-row justify-between">
                    <h2 className="text-2xl font-semibold">My Collection</h2>
                    <div className="flex flex-row gap-2">
                        <button
                            className="cursor-pointer"
                            onClick={() => setSelectedCollection('owned')}
                        >
                            Owned
                        </button>
                        <button
                            className="cursor-pointer"
                            onClick={() => setSelectedCollection('played')}
                        >
                            Played
                        </button>
                        <button
                            className="cursor-pointer"
                            onClick={() => setSelectedCollection('liked')}
                        >
                            Liked
                        </button>
                        <button
                            className="cursor-pointer"
                            onClick={() => setSelectedCollection('wishlist')}
                        >
                            Wishlist
                        </button>
                    </div>
                </div>
            </section>

            <GameList data={data.collections[selectedCollection]}></GameList>
        </div>
    );
}

export async function loader({ params }) {
    const {
        data: { session },
        error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) throw sessionError;

    if (!session) {
        redirect('/login');
        return;
    }

    try {
        const { data: profileData, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', params.userId)
            .single();

        if (profileError) throw profileError;

        const { data: gamesData = [], error: gamesError } = await supabase
            .from('user_games')
            .select('*')
            .eq('user_id', params.userId);

        if (gamesError) throw gamesError;

        const ownedGames =
            gamesData.filter((game) => game.status === 'owned') || [];
        const playedGames =
            gamesData.filter((game) => game.status === 'played') || [];
        const wishlistGames =
            gamesData.filter((game) => game.status === 'wishlist') || [];
        const likedGames =
            gamesData.filter((game) => game.status === 'liked') || [];

        const owned = await Promise.all(
            ownedGames.map((item) => getGameDataFromId(item.bgg_id)),
        );

        const played = await Promise.all(
            playedGames.map((item) => getGameDataFromId(item.bgg_id)),
        );

        const wishlist = await Promise.all(
            wishlistGames.map((item) => getGameDataFromId(item.bgg_id)),
        );

        const liked = await Promise.all(
            likedGames.map((item) => getGameDataFromId(item.bgg_id)),
        );

        const collections = {
            owned,
            played,
            wishlist,
            liked,
        };

        return {
            session,
            user: session.user,
            profile: profileData,
            collections,
        };
    } catch (error) {
        console.error('Error in loader: ', error);
        throw new Error('Failed to load profile Data');
    }
}

export default Profile;
