export interface CustomerPathParams {
    readonly customerId: string | number;
}

export const routeCustomerDetailInfo = {
    path: `/customer/:${nameof<CustomerPathParams>(o => o.customerId)}`,
    title: 'Thông tin khách hàng'
};

export const getCustomerDetailUrl = (params: CustomerPathParams) => {
    return routeCustomerDetailInfo
        .path
        .replace(
            `:${nameof<CustomerPathParams>(o => o.customerId)}`,
            params.customerId as string
        );
};