export type PaymentType = 'SALE' | 'BOOKING' | 'BUYING_SERVICE_PACKAGE';
export type DiscountUnnit = 'MONEY' | 'PERCENTAGE';

export type PaymentMethod = 'CASH' | 'CARD' | 'TRANSFER' | 'DEBIT' | 'OTHER' | 'CASH_BACK' | 'ALL';
export type PaymentMethodLabel = 'Tiền mặt' | 'Quẹt thẻ' | 'Chuyển khoản' | 'Ghi nợ' | 'Khác' | 'Hoàn lại tiền';

export interface PaymentMethodItem {
    readonly amount: number;
    readonly paymentMethod: PaymentMethod;
}

export interface TransactionDTO {
    readonly invoiceCode: string;
    readonly note?: string;
    readonly paymentMethodDTOS?: PaymentMethodItem[];
}

export interface SpabranchTransaction {
    readonly created: string;
    readonly updated: string;
    readonly createdBy: string;
    readonly updatedBy: string;
    readonly status: string;
    readonly id: number;
    readonly invoiceCode: number;
    readonly customerId: number;
    readonly total: number;
    readonly appointmentId: number;
    readonly spaBranchId: number;
    readonly customerName: string;
    readonly creatorName: string;
    readonly spaId: number;
    readonly paymentType: PaymentType;
    readonly bookingId: number;
    readonly note: string;
    readonly code: string;
}

export const paymentMethods: Array<{
    readonly value: PaymentMethod;
    readonly label: PaymentMethodLabel
}> = [
        { label: 'Tiền mặt', value: 'CASH' },
        { label: 'Quẹt thẻ', value: 'CARD' },
        { label: 'Chuyển khoản', value: 'TRANSFER' },
        { label: 'Ghi nợ', value: 'DEBIT' },
        { label: 'Khác', value: 'OTHER' },
        { label: 'Hoàn lại tiền', value: 'CASH_BACK' },
    ];

export const transactionUtils = {
    getPaymentMethodLable: (paymentMethod: PaymentMethod) => {
        return paymentMethods.find(o => o.value === paymentMethod)!.label;
    }
};
