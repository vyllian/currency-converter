export type CurrencyCode = Uppercase<string>;

export type CurrencyMap = Record<CurrencyCode, string | number>;

export type CurrencyConversion = {
    amount: number;
    base: CurrencyCode;
    date: string;
    rates: CurrencyMap;
};

export type CurrencyChanges = {
    base: CurrencyCode;
    start_date: string;
    end_date: string;
    rates: {
        [date: string]: CurrencyMap;
    }
}