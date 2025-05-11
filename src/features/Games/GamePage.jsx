import { useLoaderData } from 'react-router';
import { getGameDataFromId } from '../../utils/helpers';
import Button from '../../ui/Button';

import {
    FaUserGroup,
    FaRegClock,
    FaAlignLeft,
    FaRegStar,
    FaRegHeart as LikeIcon,
    FaRegBookmark as OwnedIcon,
    FaRegCircleCheck as PlayedIcon,
    FaCartShopping as WishlistIcon,
} from 'react-icons/fa6';
import GameStats from './GameStats';
import { useAuth } from '../../contexts/AuthContext';
import supabase from '../../services/supabase';
import { useState } from 'react';

function GamePage() {
    const { gameData, userCollections } = useLoaderData();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const {
        image,
        name,
        published,
        description,
        minplayers,
        maxplayers,
        playtime,
        weight,
        rating,
        id,
    } = gameData;

    async function handleAddToCollection(type) {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('user_games').insert([
                {
                    user_id: user.id,
                    bgg_id: id,
                    status: type,
                },
            ]);

            if (error) throw error;
        } catch (error) {
            console.log('Error adding game to:', type, 'Collection');
        } finally {
            setLoading(false);
        }
    }

    async function handleRemoveFromCollection(type) {}

    return (
        <section className="container w-[95%] p-10">
            <div className="border-b-1 border-neutral-500 pb-5">
                <img className="m-auto max-h-[50vh]" src={image} />
                <div className="mt-5 flex flex-col gap-5">
                    <div>
                        <h1 className="text-3xl font-semibold">{name}</h1>
                        <span className="text-sm text-neutral-500">
                            Published {published}
                        </span>
                    </div>
                    <div className="flex flex-row justify-around">
                        <GameStats
                            icon={<FaUserGroup />}
                            type="Players"
                            value={
                                minplayers === maxplayers
                                    ? minplayers
                                    : `${minplayers}-${maxplayers}`
                            }
                        />
                        <GameStats
                            icon={<FaRegClock />}
                            type="Time"
                            value={`${playtime} min`}
                        />
                        <GameStats
                            icon={<FaAlignLeft className="-rotate-90" />}
                            type="Weight"
                            value={Math.round(weight * 100) / 100}
                        />
                        <GameStats
                            icon={<FaRegStar />}
                            type="Rating"
                            value={Math.round(rating * 100) / 100}
                        />
                    </div>
                    {user && (
                        <div className="justify-left flex flex-row gap-3">
                            <Button
                                onClick={() => handleAddToCollection('played')}
                                disabled={loading}
                            >
                                <PlayedIcon />
                                Played
                            </Button>
                            <Button
                                onClick={() => handleAddToCollection('liked')}
                                disabled={loading}
                            >
                                <LikeIcon />
                                Liked
                            </Button>
                            <Button
                                onClick={() => handleAddToCollection('owned')}
                                disabled={loading}
                            >
                                <OwnedIcon />
                                Owned
                            </Button>
                            <Button
                                onClick={() =>
                                    handleAddToCollection('wishlist')
                                }
                                disabled={loading}
                            >
                                <WishlistIcon />
                                Wishlist
                            </Button>
                        </div>
                    )}
                    <div className="flex flex-col gap-3">
                        <span className="text-2xl font-semibold">
                            Description:
                        </span>
                        <p className="text-md text-neutral-500">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export async function loader({ params }) {
    try {
        const gameData = await getGameDataFromId(params.gameId);
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
            return {
                gameData,
                userCollections: null,
            };
        }

        const { data: userGameData, error } = await supabase
            .from('user_games')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('bgg_id', params.gameId);

        if (error) {
            console.error('Error fetching user collection:', error);
            return {
                gameData,
                userCollections: null,
            };
        }

        const userCollections = {
            played: false,
            liked: false,
            owned: false,
            wishlist: false,
        };

        userGameData?.forEach((item) => {
            if (item.status in userCollections) {
                userCollections[item.status] = true;
            }
        });

        return {
            gameData,
            userCollections,
        };
    } catch (error) {
        console.error('Error in Game Loader:', error);
        throw new Error('Failed to load game data');
    }
}

export default GamePage;
