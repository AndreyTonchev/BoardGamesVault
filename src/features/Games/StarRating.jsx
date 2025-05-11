import { useState } from 'react';
import {
    FaRegStar as EmptyStar,
    FaStar as FullStar,
    FaStarHalfStroke as HalfStar,
} from 'react-icons/fa6';

export default function StarRating({ defaultRating = 0, onSetRating, rating }) {
    const [tempRating, setTempRating] = useState(defaultRating);

    function handleRating(rating) {
        onSetRating(rating);
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
                        onHoverIn={setTempRating}
                        onHoverOut={() => setTempRating(0)}
                    />
                ))}
            </div>
            <p className="text-md font-semibold">{tempRating || rating} / 10</p>
        </div>
    );
}

function Star({ starIndex, rating, onSetRating, onHoverIn, onHoverOut }) {
    // Calculate how full this star should be (0, 0.5, or 1)
    const fillAmount = Math.max(0, Math.min(1, rating / 2 - starIndex));

    // Determine which icon to show
    let icon;
    if (fillAmount === 0) {
        icon = <EmptyStar />;
    } else if (fillAmount === 0.5) {
        icon = <HalfStar />;
    } else {
        icon = <FullStar />;
    }

    // Handle click based on which half of the star was clicked
    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const halfWidth = rect.width / 2;

        // Determine if clicked on left or right half
        const clickedRating = starIndex * 2 + (x < halfWidth ? 1 : 2);
        onSetRating(clickedRating);
    };

    // Handle hover based on which half is being hovered
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const halfWidth = rect.width / 2;

        // Determine if hovering on left or right half
        const hoveredRating = starIndex * 2 + (x < halfWidth ? 1 : 2);
        onHoverIn(hoveredRating);
    };

    return (
        <span
            role="button"
            className="relative cursor-pointer"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={onHoverOut}
            style={{ userSelect: 'none' }}
        >
            {icon}
        </span>
    );
}
