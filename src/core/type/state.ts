import type {CurrencyChanges, CurrencyCode, CurrencyMap} from "@/core/type/currency.ts";

export interface ConversionHistory {
    id: string;
    base: CurrencyCode;
    target: CurrencyCode;
    amount: number;
    result: number;
    date: string;
}

export interface CurrencyState {
    base: CurrencyCode;
    target: CurrencyCode;
    amount: number;
    result: number;

    rates: CurrencyMap;
    currencies: CurrencyMap;

    history: ConversionHistory[];
    chartData: CurrencyChanges | null;

    loading: boolean;
    error: string | null;
    lastUpdated: number | null;
}