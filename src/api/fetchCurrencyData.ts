import {handleRequest} from "@/api/http.ts";
import type {CurrencyCode, CurrencyConversion, CurrencyMap} from "@/core/type/currency.ts";
import {formatDate} from "@/core/utils/formatDate.ts";

const baseUrl = "https://api.frankfurter.dev/v1";

export async function fetchCurrencyConversion(from: CurrencyCode, to: CurrencyCode[]): Promise<CurrencyConversion> {
    const params = {
        base: from,
        symbols: to.join(","),
    }

    return await handleRequest(`${baseUrl}/latest`, params);
}

export async function fetchCurrencyList():Promise<CurrencyMap> {
    return await handleRequest(`${baseUrl}/currencies`)
}

export async function fetchCurrencyData(date: Date, from: CurrencyCode, to: CurrencyCode) {
    const params = {
        base: from,
        symbols: to,
    }

    return await handleRequest(`${baseUrl}/${formatDate(date)}..`, params)
}