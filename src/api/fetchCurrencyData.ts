import {handleRequest} from "@/api/http.ts";
import type {CurrencyChanges, CurrencyCode, CurrencyConversion, CurrencyMap} from "@/core/type/currency.ts";
import {formatDate} from "@/core/utils/formatDate.ts";

const baseUrl = "https://api.frankfurter.dev/v1";

export async function fetchCurrencyConversion(from: CurrencyCode, to: CurrencyCode[]) {
    const params = {
        base: from,
        symbols: to.join(","),
    }

    return await handleRequest<CurrencyConversion>(`${baseUrl}/latest`, params);
}

export async function fetchCurrencyList() {
    return await handleRequest<CurrencyMap>(`${baseUrl}/currencies`)
}

export async function fetchCurrencyData(date: Date, from: CurrencyCode, to: CurrencyCode) {
    const params = {
        base: from,
        symbols: to,
    }

    return await handleRequest<CurrencyChanges>(`${baseUrl}/${formatDate(date)}..`, params)
}