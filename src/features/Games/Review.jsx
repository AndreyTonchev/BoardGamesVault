import { useNavigate } from 'react-router';
import StarRating from './StarRating';
import { formatDate } from '../../utils/helpers';

function Review({ data, external = false, onProfile = false }) {
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

    return external ? (
        <div className="container flex flex-row items-center gap-4 p-6">
            <div className="flex flex-col gap-1">
                <div className="flex flex-row items-baseline gap-2">
                    <h3 className="text-lg font-semibold">
                        {onProfile ? (
                            ''
                        ) : (
                            <>
                                <span
                                    className="cursor-pointer hover:text-blue-200"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClick();
                                    }}
                                >
                                    {display_name}
                                </span>
                                <span className="text-md"> on </span>
                            </>
                        )}
                        <span
                            className="cursor-pointer hover:text-blue-200"
                            onClick={() => navigate(`/game/${bgg_id}`)}
                        >
                            {game_name}
                        </span>
                    </h3>
                    <span className="text-sm text-neutral-400">
                        {formatDate(created_at)}
                    </span>
                </div>
                <StarRating rating={rating} readOnly={true} />
                <p>{content}</p>
            </div>
        </div>
    ) : (
        <div className="flex flex-col justify-start gap-2 rounded-xl border-1 border-neutral-500 bg-neutral-700 p-4 text-neutral-200">
            <div className="flex flex-row items-baseline gap-2">
                <h3
                    className="cursor-pointer text-lg font-semibold hover:text-blue-200"
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
        </div>
    );
}

export default Review;
