import { useLoaderData } from 'react-router';
import supabase from '../../services/supabase';

function Profile() {
    const data = useLoaderData();
    console.log(data);

    return <div></div>;
}

export async function loader({ params }) {
    const {
        data: { session },
        error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) throw sessionError;

    if (!session) {
        navigate('/signin');
        return;
    }

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
