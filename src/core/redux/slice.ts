import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import type {ConversionHistory, CurrencyState} from "@/core/type/state.ts";
import {loadCurrencies, loadRates} from "@/core/redux/thunk.ts";
import type {CurrencyCode} from "@/core/type/currency.ts";
import {getCached} from "@/core/utils/localStorage.ts";

const cached = getCached();

const initialState: CurrencyState = {
    base: cached?.base || "EUR",
    target: "USD",
    amount: 1,
    result: 0,
    rates: cached?.rates || {},
    currencies: {},
    history: [],
    chartData: null,
    loading: false,
    error: null,
    lastUpdated: cached?.lastUpdated || null,
    offline: !navigator.onLine,
}

const slice = createSlice({
    name: "currency",
    initialState,

    reducers: {
        setAmount(state, action: PayloadAction<number>) {
            state.amount = action.payload
        },
        setBase(state, action: PayloadAction<CurrencyCode>) {
            state.base = action.payload
        },
        setTarget(state, action: PayloadAction<CurrencyCode>) {
            state.target = action.payload
        },
        swapCurrencies(state) {
            ;[state.base, state.target] = [state.target, state.base]
        },
        setResult(state, action: PayloadAction<number>) {
            state.result = action.payload
        },
        addHistory(state, action: PayloadAction<ConversionHistory>) {
            const last = state.history[0]
            if (
                last &&
                last.base === action.payload.base &&
                last.target === action.payload.target &&
                last.amount === action.payload.amount
            ) return;

            state.history.unshift(action.payload)
            state.history = state.history.slice(0, 5)
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadCurrencies.fulfilled, (state, action) => {
                state.currencies = action.payload;
            })
            .addCase(loadRates.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadRates.fulfilled, (state, action) => {
                state.loading = false;
                state.rates = action.payload.rates;
                state.lastUpdated = Date.now()
                state.offline = false;

                try {
                    localStorage.setItem(
                        "currencyRates",
                        JSON.stringify({
                            base: state.base,
                            rates: state.rates,
                            lastUpdated: state.lastUpdated
                        })
                    )
                } catch (err) {
                    state.error = err as string;
                }
            })
            .addCase(loadRates.rejected, (state) => {
                state.loading = false;
                state.offline = true;
            })
    },
})

export const {
    setAmount,
    setBase,
    setTarget,
    swapCurrencies,
    setResult,
    addHistory,
} = slice.actions

export default slice.reducer