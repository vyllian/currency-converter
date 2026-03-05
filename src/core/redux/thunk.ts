import { createAsyncThunk } from "@reduxjs/toolkit"
import {fetchCurrencyConversion, fetchCurrencyList} from "@/api/fetchCurrencyData.ts";
import type {CurrencyCode} from "@/core/type/currency.ts";


export const loadCurrencies = createAsyncThunk(
    "currency/loadCurrencies",
    async () => {
        return await fetchCurrencyList()
    }
)

export const loadRates = createAsyncThunk(
    "currency/loadRates",
    async ({ base, targets }: { base: CurrencyCode; targets: CurrencyCode[] }) => {
        return await fetchCurrencyConversion(base, targets)
    }
)