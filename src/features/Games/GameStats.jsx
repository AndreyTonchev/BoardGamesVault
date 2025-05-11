function GameStats({ icon, type, value }) {
    return (
        <div className="flex flex-row items-center gap-2">
            {icon}
            <span className="text-neutral-500">{type}:</span>
            <span className="font-semibold">{value}</span>
        </div>
    );
}

export default GameStats;
