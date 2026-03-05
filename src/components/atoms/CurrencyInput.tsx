function CurrencyInput(
    {
        value,
        readOnly,
        onChange,
    }:{
        value: number,
        readOnly?: boolean,
        onChange?: (value: number) => void,
    }
) {
    return (
        <div
            className="w-full flex justify-center items-center"
        >
            <input
                type="number"
                value={value}
                readOnly={readOnly}
                onChange={(e) => onChange?.(Number(e.target.value))}
                className="flex-1 rounded-lg px-3 py-2 bg-gray-200"
            />
        </div>
    )
}

export default CurrencyInput;