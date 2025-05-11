import { useLoaderData } from 'react-router';
import { getGameDataFromId } from '../../utils/helpers';
import Button from '../../ui/Button';

import {
    FaUserGroup,
    FaRegClock,
    FaAlignLeft,
    FaRegStar,
    FaRegComment,
    FaRegHeart as LikeIcon,
    FaRegBookmark as OwnedIcon,
    FaRegCircleCheck as PlayedIcon,
    FaCartShopping as WishlistIcon,
} from 'react-icons/fa6';
import GameStats from './GameStats';
import { useAuth } from '../../contexts/AuthContext';
import supabase from '../../services/supabase';
import { useState } from 'react';
import StarRating from './StarRating';

function GamePage() {
    const { gameData, userCollections } = useLoaderData();

    const initialCollection = userCollections || {
        played: false,
        liked: false,
        owned: false,
        wishlist: false,
    };

    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [collections, setCollections] = useState(initialCollection);

    const [reviewRating, setReviewRating] = useState(0);
    const [review, setReview] = useState('');

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

    async function handleCollectionButton(status) {
        setLoading(true);
        try {
            if (collections[status] === false) {
                const { error } = await supabase.from('user_games').insert([
                    {
                        user_id: user.id,
                        bgg_id: id,
                        status: status,
                    },
                ]);

                if (error) throw error;
                setCollections({ ...collections, [status]: true });
            } else {
                const { error } = await supabase
                    .from('user_games')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('bgg_id', id)
                    .eq('status', status);
                if (error) throw error;
                setCollections({ ...collections, [status]: false });
            }
        } catch (error) {
            console.log('Error changing game to:', status, 'Collection');
        } finally {
            setLoading(false);
        }
    }

    async function onSubmitReview(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from('user_content').insert([
                {
                    user_id: user.id,
                    bgg_id: id,
                    user_name: user.user_metadata.display_name,
                    rating: reviewRating,
                    content: review,
                },
            ]);

            if (error) throw error;
        } catch (error) {
            console.error('Error submiting review');
        } finally {
            setReview('');
            setReviewRating(0);
            setLoading(false);
        }
    }

    return (
        <section className="container w-[95%] p-10">
            <div className="mb-5 border-b-1 border-neutral-500 pb-5">
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
                        <div className="flex flex-row gap-3">
                            <Button
                                extraStyles={
                                    collections.played
                                        ? 'bg-blue-700'
                                        : 'bg-neutral-700'
                                }
                                onClick={() => handleCollectionButton('played')}
                                disabled={loading}
                            >
                                <PlayedIcon />
                                Played
                            </Button>
                            <Button
                                extraStyles={
                                    collections.liked
                                        ? 'bg-blue-700'
                                        : 'bg-neutral-700'
                                }
                                onClick={() => handleCollectionButton('liked')}
                                disabled={loading}
                            >
                                <LikeIcon />
                                Liked
                            </Button>
                            <Button
                                extraStyles={
                                    collections.owned
                                        ? 'bg-blue-700'
                                        : 'bg-neutral-700'
                                }
                                onClick={() => handleCollectionButton('owned')}
                                disabled={loading}
                            >
                                <OwnedIcon />
                                Owned
                            </Button>
                            <Button
                                extraStyles={
                                    collections.wishlist
                                        ? 'bg-blue-700'
                                        : 'bg-neutral-700'
                                }
                                onClick={() =>
                                    handleCollectionButton('wishlist')
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
            <div className="flex flex-col gap-5">
                <div className="flex flex-row items-center gap-2 text-2xl font-semibold">
                    <FaRegComment />
                    <h2>Reviews and Comments</h2>
                </div>

                {user && (
                    <form
                        className="flex flex-col justify-start gap-3 rounded-xl border-1 border-neutral-500 bg-neutral-700 p-4 text-neutral-200"
                        onSubmit={onSubmitReview}
                    >
                        <h3 className="font-semibold">Your Rating:</h3>
                        <StarRating
                            rating={reviewRating}
                            onSetRating={setReviewRating}
                        />
                        <span className="font-semibold">Write a Review</span>
                        <textarea
                            value={review}
                            placeholder="Share your thoughts about the game..."
                            onChange={(e) => setReview(e.target.value)}
                            className="rounded-lg border-1 border-neutral-500 bg-neutral-800 px-3 py-2"
                            rows={4}
                        />
                        <Button disabled={loading}>Post Review</Button>
                    </form>
                )}
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

        console.log(userGameData);

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
