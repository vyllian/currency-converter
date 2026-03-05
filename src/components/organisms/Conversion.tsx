import CurrencyInput from "@/components/atoms/CurrencyInput.tsx";
import CurrencySelect from "@/components/atoms/CurrencySelect.tsx";
import {useAppDispatch, useAppSelector} from "@/core/redux/hooks.ts";
import {useEffect} from "react";
import {convertCurrency} from "@/core/utils/conversion.ts";
import {setAmount, setBase, setResult, setTarget, swapCurrencies} from "@/core/redux/slice.ts";
import {IoSwapVertical} from "react-icons/io5";
import {loadCurrencies, loadRates} from "@/core/redux/thunk.ts";

function Conversion() {
    const dispatch = useAppDispatch();
    const {
        amount,
        result,
        base,
        target,
        rates,
    } = useAppSelector(state => state.currency)

    useEffect(() => {
        const converted = convertCurrency(
            amount,
            base,
            target,
            rates
        )
        dispatch(setResult(converted))
    }, [amount, base, target, rates, dispatch])

    useEffect(() => {
        dispatch(loadCurrencies())
    }, [dispatch])

    useEffect(() => {
        dispatch(loadRates({base, targets: [target]}))
    }, [base, dispatch, target])

    return (
        <div
            className="w-1/2 p-3 border border-gray-200 rounded-2xl flex flex-col gap-2"
        >
            <p>
                Amount
            </p>
            <div
                className="flex justify-center items-center gap-2"
            >
                <CurrencySelect value={base} onChange={value => dispatch(setBase(value))}/>
                <CurrencyInput value={amount} onChange={value => dispatch(setAmount(value))}/>
            </div>
            <div
                className="w-full flex items-center gap-1"
            >
                <hr className="w-full h-0 border-gray-200"/>
                <button
                    onClick={() => dispatch(swapCurrencies())}
                    className="p-2 bg-emerald-200 rounded-full cursor-pointer hover:bg-emerald-300"
                >
                    <IoSwapVertical size={20}/>
                </button>
                <hr className="w-full h-0 border-gray-200"/>
            </div>
            <p>
                Converted amount
            </p>
            <div
                className="flex justify-center items-center gap-2"
            >
                <CurrencySelect value={target} onChange={value => dispatch(setTarget(value))}/>
                <CurrencyInput value={result} readOnly/>
            </div>
        </div>
    )
}

export default Conversion;