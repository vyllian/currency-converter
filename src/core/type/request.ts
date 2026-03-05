import type {CurrencyCode} from "@/core/type/currency.ts";

export type RequestParams = {
    base: CurrencyCode,
    symbols: string, // UAH or UAH,EUR,...
}