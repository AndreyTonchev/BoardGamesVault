function Button({
    children,
    onClick,
    extraStyles,
    disabled = false,
    type = 'submit',
}) {
    return (
        <button
            type={type}
            className={`container m-0 box-border flex w-40 cursor-pointer items-center justify-center gap-2 self-center bg-blue-700 font-semibold text-neutral-200 transition-all duration-300 hover:bg-blue-500 ${extraStyles}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
