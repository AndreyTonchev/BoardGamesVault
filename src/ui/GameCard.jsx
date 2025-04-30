function GameCard({ gameData }) {
    return (
        <li className="flex h-80 w-[95%] rounded-2xl bg-neutral-800 p-0 text-gray-200">
            <div className="justify-left flex aspect-square h-full">
                <img
                    className="h-full rounded-tl-2xl rounded-bl-2xl"
                    src={gameData.image}
                />
            </div>
            <div>
                <header className="p-3 text-3xl font-bold">
                    {gameData.name} ({gameData.published})
                </header>
            </div>
        </li>
    );
}

export default GameCard;
