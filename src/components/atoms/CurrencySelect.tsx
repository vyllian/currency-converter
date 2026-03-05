import { RiArrowDropDownLine } from "react-icons/ri";
import {useAppSelector} from "@/core/redux/hooks.ts";
import type {CurrencyCode} from "@/core/type/currency.ts";

function CurrencySelect(
    {
        value,
        onChange
    }:{
        value: CurrencyCode,
        onChange: (currency: CurrencyCode) => void
    }
) {
    const {currencies} = useAppSelector(state => state.currency);
    console.log(currencies);

    return (
        <div className="relative w-full cursor-pointer">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as CurrencyCode)}
                className="w-full appearance-none rounded-xl px-4 py-2 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 cursor-pointer"
            >
                {Object.keys(currencies).length === 0 ?
                    <option disabled value="">Loading...</option>
                    :
                    Object.entries(currencies).map(([code, name]) => (
                    <option
                        key={code}
                        value={code}
                        title={name.toString()}
                    >
                        {code}
                    </option>
                ))}
            </select>
            <RiArrowDropDownLine
                size={18}
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
            />
        </div>
    )
}

export default CurrencySelect;