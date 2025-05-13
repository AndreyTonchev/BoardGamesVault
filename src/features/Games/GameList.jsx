import GameCard from './GameCard';

function GameList({ children, data }) {
    return (
        <>
            <span className="text-2xl font-semibold text-gray-200">
                {children}
            </span>
            <div className="m-5 grid w-[95%] grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {data.map((gameData, index) => (
                    <GameCard
                        gameData={gameData}
                        index={index + 1}
                        key={gameData.id}
                    />
                ))}
            </div>
        </>
    );
}

export default GameList;
