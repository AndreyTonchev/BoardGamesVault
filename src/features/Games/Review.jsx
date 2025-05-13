import { useNavigate } from 'react-router';
import StarRating from './StarRating';
import { formatDate } from '../../utils/helpers';

function Review({ data, external = false }) {
    const {
        content,
        rating,
        display_name,
        user_id,
        created_at,
        bgg_id,
        game_name,
    } = data;
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/profile/${user_id}`);
    }

    return (
        <div
            onClick={external ? () => navigate(`/game/${bgg_id}`) : null}
            className="flex flex-col justify-start gap-2 rounded-xl border-1 border-neutral-500 bg-neutral-700 p-4 text-neutral-200"
        >
            <div className="flex flex-row items-baseline gap-2">
                <h3
                    className="cursor-pointer text-lg font-semibold"
                    onClick={handleClick}
                >
                    {display_name}
                </h3>
                <span className="text-sm text-neutral-400">
                    {formatDate(created_at)}
                </span>
            </div>
            <StarRating rating={rating} readOnly={true} />
            <p>{content}</p>
            {external && (
                <span className="text-amber-200 italic">For {game_name}</span>
            )}
        </div>
    );
}

export default Review;
