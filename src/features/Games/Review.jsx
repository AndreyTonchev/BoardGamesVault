import { useNavigate } from 'react-router';
import StarRating from './StarRating';
import { formatDate } from '../../utils/helpers';

function Review({ data }) {
    const { content, rating, display_name, user_id, date } = data;
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/profile/${user_id}`);
    }

    return (
        <div className="flex flex-col justify-start gap-2 rounded-xl border-1 border-neutral-500 bg-neutral-700 p-4 text-neutral-200">
            <div className="flex flex-row items-baseline gap-2">
                <h3
                    className="cursor-pointer text-lg font-semibold"
                    onClick={handleClick}
                >
                    {display_name}
                </h3>
                <span className="text-sm text-neutral-400">
                    {formatDate(date)}
                </span>
            </div>
            <StarRating rating={rating} readOnly={true} />
            <p>{content}</p>
        </div>
    );
}

export default Review;
