import {
    FaUserGroup,
    FaCalendar,
    FaRegStar as EmptyStar,
    FaStar as FullStar,
    FaStarHalfStroke as HalfStar,
} from 'react-icons/fa6';

function GameCard({ gameData, index }) {
    const { name, image, rating, published, minplayers, maxplayers } = gameData;

    const renderStar = (rating, starPosition) => {
        if (rating >= 2 * starPosition) return <FullStar />;
        if (rating >= 2 * starPosition - 1) return <HalfStar />;
        return <EmptyStar />;
    };

    return (
        <div className="container m-0 flex flex-row items-center gap-4 transition-all duration-500 hover:scale-105">
            <span className="pl-3 text-2xl font-semibold text-gray-400">
                {index}
            </span>
            <div className="flex aspect-square h-32 items-center justify-center">
                <img className="h-[90%] rounded-xl" src={image} />
            </div>
            <div className="flex h-full flex-col justify-center gap-1.5">
                <h2 className="text-lg font-semibold">{name}</h2>
                <div className="flex flex-row gap-2">
                    <span className="flex flex-row items-center gap-1 text-sm">
                        <FaCalendar />
                        {published}
                    </span>
                    <span className="flex flex-row items-center gap-1 text-sm">
                        <FaUserGroup />
                        {minplayers === maxplayers
                            ? minplayers
                            : `${minplayers}-${maxplayers}`}
                    </span>
                </div>
                <span className="flex flex-row items-center gap-2 text-sm text-amber-300">
                    <div className="flex flex-row">
                        {renderStar(rating, 1)}
                        {renderStar(rating, 2)}
                        {renderStar(rating, 3)}
                        {renderStar(rating, 4)}
                        {renderStar(rating, 5)}
                    </div>
                    {Math.round(rating * 10) / 10}/10
                </span>
            </div>
        </div>
    );
}

export default GameCard;
