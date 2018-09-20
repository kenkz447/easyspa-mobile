export type PaymentMethod = 'CASH' | 'CARD' | 'TRANSFER' | 'DEBIT' | 'OTHER' | 'CASH_BACK';

export interface PaymentMethodItem {
    readonly amount: number;
    readonly paymentMethod: PaymentMethod;
}

export interface TransactionDTO {
    readonly invoiceCode?: string;
    readonly note?: string;
    readonly paymentMethodDTOS?: PaymentMethodItem[];
}