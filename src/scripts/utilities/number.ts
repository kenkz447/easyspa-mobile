const replace = require('lodash/replace');

export function roundTo(n: number, digits: number) {
    if (!n) {
        return 0;
    }

    if (digits === undefined) {
        digits = 0;
    }

    const multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    const test = (Math.round(n) / multiplicator);
    return +(test.toFixed(digits));
}

interface FormatCurrencyValue {
    readonly amount: number;
    readonly sourceCurrency?: string;
    readonly rate: number;
}

export function formatCurrency(value: number | FormatCurrencyValue) {
    let amount = 0;
    let sourceCurrency: string | null = null;
    let rate = 1;

    if (typeof value === 'number') {
        amount = value;
    } else {
        amount = value.amount;
        sourceCurrency = value.sourceCurrency || null;
        rate = value.rate;
    }

    // Default destCurrency = 'VND'
    if (!amount || amount <= 0) {
        return `0 ${sourceCurrency ? sourceCurrency : ''}`.trim();
    }

    if (sourceCurrency) {
        amount = roundTo(+amount / rate, 2);
    }

    return `${replace(amount, /(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${sourceCurrency ? sourceCurrency : ''}`.trim();
}