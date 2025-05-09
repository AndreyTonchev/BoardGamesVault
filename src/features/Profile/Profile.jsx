import { useLoaderData } from 'react-router';
import supabase from '../../services/supabase';
import Button from '../../ui/Button';
import Stats from './Stats';

function Profile() {
    const data = useLoaderData();
    console.log(data);

    return (
        <div className="w-[95%] text-neutral-200">
            <section className="container flex flex-col gap-6 p-6">
                <header className="flex justify-between">
                    <div className="flex items-center justify-center gap-4">
                        <img
                            className="h-25 rounded-full"
                            src="../../default_avatar.jpg"
                        />
                        <div>
                            <h2 className="text-2xl font-semibold">
                                {data.profile.name}
                            </h2>
                            <h3 className="text-sm text-neutral-500">
                                @{data.profile.name}
                            </h3>
                        </div>
                    </div>
                    {data.user.id === data.profile.id ? (
                        <Button>Edit Profile</Button>
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
        </div>
    );
}

export async function loader({ params }) {
    const {
        data: { session },
        error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) throw sessionError;

    // if (!session) {
    //     navigate('/signin');
    //     return;
    // }

    try {
        const { data: profileData, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('name', params.username)
            .single();

        if (profileError) throw profileError;

        const { data: gamesData = [], error: gamesError } = supabase
            .from('user_games')
            .select('*')
            .eq('user_id', profileData.id);

        if (gamesError) throw gamesError;

        const owned = gamesData.filter((game) => game.status === 'owned') || [];
        const played =
            gamesData.filter((game) => game.status === 'played') || [];
        const wishlist =
            gamesData.filter((game) => game.status === 'wishlist') || [];
        const liked = gamesData.filter((game) => game.status === 'liked') || [];

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
