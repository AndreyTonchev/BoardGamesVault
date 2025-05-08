import { useLoaderData } from 'react-router';
import supabase from '../services/supabase';

function Home() {
    const users = useLoaderData();
    console.log(users);
    return <div className="text-green-400"></div>;
}

export async function loader() {
    let { data: users, error } = await supabase.from('users').select('*');

    return users;
}

export default Home;
