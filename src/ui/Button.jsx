function Button({
    children,
    bgColor = 'bg-blue-500',
    onClick,
    hoverColor = 'hover:bg-blue-700',
    textColor = 'text-neutral-200',
}) {
    return (
        <button
            className={`${bgColor} ${hoverColor} ${textColor} container m-0 w-40 self-center font-semibold transition-all duration-300`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
