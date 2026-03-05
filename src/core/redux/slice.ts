import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import type {ConversionHistory, CurrencyState} from "@/core/type/state.ts";
import {loadCurrencies, loadRates} from "@/core/redux/thunk.ts";
import type {CurrencyCode} from "@/core/type/currency.ts";

const initialState: CurrencyState = {
    base: "EUR",
    target: "USD",
    amount: 1,
    result: 0,

    rates: {},
    currencies: {},

    history: [],
    chartData: null,

    loading: false,
    error: null,
    lastUpdated: null,
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
            state.history.unshift(action.payload)
            state.history = state.history.slice(0, 10)
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadCurrencies.fulfilled, (state, action) => {
                state.currencies = action.payload
            })
            .addCase(loadRates.pending, (state) => {
                state.loading = true
            })
            .addCase(loadRates.fulfilled, (state, action) => {
                state.loading = false
                state.rates = action.payload.rates
            })
            .addCase(loadRates.rejected, (state) => {
                state.loading = false
                state.error = "Failed to fetch rates"
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