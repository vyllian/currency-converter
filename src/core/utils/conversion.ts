import type {CurrencyCode, CurrencyMap} from "@/core/type/currency.ts";

export function convertCurrency( amount: number, base: CurrencyCode, target: CurrencyCode, rates: CurrencyMap) {
    if (base === target) return amount;
    const rate = rates[target];

    return rate? amount * +rate : 0;
}