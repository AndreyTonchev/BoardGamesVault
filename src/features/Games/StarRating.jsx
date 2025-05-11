import { useState } from 'react';
import {
    FaRegStar as EmptyStar,
    FaStar as FullStar,
    FaStarHalfStroke as HalfStar,
} from 'react-icons/fa6';

export default function StarRating({
    defaultRating = 0,
    onSetRating,
    rating,
    readOnly = false,
}) {
    const [tempRating, setTempRating] = useState(defaultRating);

    function handleRating(rating) {
        if (!readOnly && onSetRating) {
            onSetRating(rating);
        }
    }

    const stars = 5;

    return (
        <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row text-2xl text-amber-300">
                {Array.from({ length: stars }, (_, i) => (
                    <Star
                        key={i}
                        starIndex={i}
                        rating={tempRating || rating}
                        onSetRating={handleRating}
                        onHoverIn={readOnly ? null : setTempRating}
                        onHoverOut={readOnly ? null : () => setTempRating(0)}
                        readOnly={readOnly}
                    />
                ))}
            </div>
            <p className="text-md font-semibold">{tempRating || rating} / 10</p>
        </div>
    );
}

function Star({
    starIndex,
    rating,
    onSetRating,
    onHoverIn,
    onHoverOut,
    readOnly,
}) {
    const fillAmount = Math.max(0, Math.min(1, rating / 2 - starIndex));

    let icon;
    if (fillAmount === 0) {
        icon = <EmptyStar />;
    } else if (fillAmount === 0.5) {
        icon = <HalfStar />;
    } else {
        icon = <FullStar />;
    }

    function handleClick(e) {
        if (!readOnly) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const halfWidth = rect.width / 2;

            const clickedRating = starIndex * 2 + (x < halfWidth ? 1 : 2);
            onSetRating(clickedRating);
        }
    }

    function handleMouseMove(e) {
        if (!readOnly) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const halfWidth = rect.width / 2;

            const hoveredRating = starIndex * 2 + (x < halfWidth ? 1 : 2);
            onHoverIn(hoveredRating);
        }
    }

    return (
        <span
            role="button"
            className={`relative ${readOnly ? '' : 'cursor-pointer'}`}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={onHoverOut}
        >
            {icon}
        </span>
    );
}
