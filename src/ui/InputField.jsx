function InputField({
    children,
    bgColor = 'bg-neutral-900',
    value,
    onChange,
    placeholder,
    type = 'text',
    required = false,
    moreContent = false,
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-neutral-200">{children}</label>
            {moreContent ? (
                <textarea
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`rounded-lg border-1 border-neutral-500 ${bgColor} px-3 py-2`}
                    rows={4}
                    required={required}
                />
            ) : (
                <input
                    className={`container ${bgColor} m-0 border-1 border-neutral-500`}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                />
            )}
        </div>
    );
}

export default InputField;
