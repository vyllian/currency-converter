import type {CurrencyCode, CurrencyMap} from "@/core/type/currency"
import {useEffect, useMemo, useState} from "react"
import {useAppSelector} from "@/core/redux/hooks.ts";
import {fetchCurrencyConversion} from "@/api/fetchCurrencyData.ts";
import { IoIosArrowRoundForward } from "react-icons/io";

const POPULAR_CURRENCIES: CurrencyCode[] = ["USD", "GBP", "JPY", "AUD", "CHF"]

function RateBoard() {
    const {base} = useAppSelector(state => state.currency);
    const [rates, setRates] = useState<CurrencyMap>();

    const popularRates = useMemo(() => {
        return POPULAR_CURRENCIES.filter((cur) => cur !== base).map((cur) => ({
            code: cur,
            rate: rates ? rates[cur] : 0,
        }))
    }, [base, rates])

    useEffect(() => {
        const loadRates = async () => {
            const response = await fetchCurrencyConversion(base, POPULAR_CURRENCIES)
            setRates(response.rates);
        }
        loadRates();
    }, [base]);

    return (
        <ul className="w-full flex flex-col justify-between items-center gap-2 overflow-y-auto">
            {popularRates.map(({code, rate}) => (
                <li
                    key={code}
                    className="grid grid-cols-3 items-center w-full p-3 bg-emerald-50 rounded shadow-sm text-sm"
                >
                    <span className="text-left">
                        1 {base}
                    </span>
                    <div className="flex justify-center items-center">
                        <IoIosArrowRoundForward size={20}/>
                    </div>
                    <span className="text-right font-medium">
                        {Number(rate).toFixed(2)} {code}
                    </span>
                </li>
            ))}
        </ul>
    )
}

export default RateBoard;