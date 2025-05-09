function Stats({ children, value }) {
    return (
        <div className="flex flex-col items-center gap-1">
            <span>{value}</span>
            <span>{children}</span>
        </div>
    );
}

export default Stats;
