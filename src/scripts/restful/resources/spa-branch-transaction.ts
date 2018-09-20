export type PaymentMethod = 'CASH' | 'CARD' | 'TRANSFER' | 'DEBIT' | 'OTHER' | 'CASH_BACK';

export interface PaymentMethodItem {
    readonly amount: number;
    readonly paymentMethod: PaymentMethod;
}