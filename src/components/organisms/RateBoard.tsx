import type {CurrencyCode, CurrencyMap} from "@/core/type/currency"
import {useEffect, useMemo, useRef, useState} from "react"
import {useAppSelector} from "@/core/redux/hooks.ts";
import {fetchCurrencyConversion} from "@/api/fetchCurrencyData.ts";
import { IoIosArrowRoundForward } from "react-icons/io";
import gsap from "gsap";

const POPULAR_CURRENCIES: CurrencyCode[] = ["EUR", "USD", "GBP", "JPY", "AUD", "CHF"]

function RateBoard() {
    const {base} = useAppSelector(state => state.currency);
    const [rates, setRates] = useState<CurrencyMap>();

    const listRef = useRef<HTMLUListElement>(null);

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

    useEffect(() => {
        if (!listRef.current) return;

        const items = Array.from(listRef.current.children) as HTMLElement[]
        gsap.fromTo(
            items,
            { opacity: 0, y: 10 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.out",
            }
        )
    }, [popularRates]);

    return (
        <ul
            ref={listRef}
            className="w-full flex flex-col justify-between items-center gap-2 overflow-y-auto"
        >
            {popularRates.map(({code, rate}) => (
                <li
                    key={code}
                    className="grid grid-cols-3 items-center w-full p-3 bg-emerald-50 rounded-lg shadow-sm text-sm"
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