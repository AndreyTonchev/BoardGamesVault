function InputField({
    children,
    bgColor = 'bg-neutral-800',
    value,
    onChange,
    placeholder,
    type = 'text',
    required = 'false',
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-neutral-200">{children}</label>
            <input
                className={`container ${bgColor} m-0`}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}

export default InputField;
