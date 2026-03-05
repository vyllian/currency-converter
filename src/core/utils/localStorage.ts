import type {CurrencyCache} from "@/core/type/currency.ts";

const ONE_HOUR = 1000 * 60 * 60;

export const getCached = (): CurrencyCache | null => {
    try {
        const item = localStorage.getItem("currencyRates");
        if (!item) return null;
        const parsed = JSON.parse(item);
        if (Date.now() - parsed.lastUpdated > ONE_HOUR) {
            localStorage.removeItem("currencyRates");
            return null;
        }
        return parsed;
    } catch {
        return null;
    }
}