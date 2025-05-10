import { useLoaderData } from 'react-router';
import supabase from '../services/supabase';

function Home() {
    return <div className="text-green-400"></div>;
}

export async function loader() {}

export default Home;
