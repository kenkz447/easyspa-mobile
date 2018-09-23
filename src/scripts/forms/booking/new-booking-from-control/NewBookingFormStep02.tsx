import { Button, List, WhiteSpace } from 'antd-mobile';
import { object } from 'prop-types';
import * as React from 'react';
import { Store } from 'redux';
import {
    Field,
    FieldArray,
    formValueSelector,
    InjectedFormProps,
    submit
} from 'redux-form';

import { RenderPickerField, RenderSwitchField } from '@/components';
import {
    Appointment,
    restfulFetcher,
    Service,
    serviceResources
} from '@/restful';
import { formatCurrency } from '@/utilities';

import { BookingAppointmentQuantity } from './new-booking-form-step-02';
import { NewBookingFormProps, NewBookingFormValue } from './NewBookingForm';

const lodash = require('lodash');

interface NewBookingFormStep02Props extends InjectedFormProps<
    NewBookingFormValue,
    NewBookingFormProps
    > {
    readonly prev: () => void;
}

interface NewBookingFormStep02State {
    readonly services: Service[];
    readonly groupServices?: {
        readonly [key: string]: Service[]
    };
}

export class NewBookingFormStep02 extends React.Component<
    NewBookingFormProps & NewBookingFormStep02Props,
    NewBookingFormStep02State,
    { readonly store: Store; }> {

    static readonly contextTypes = {
        store: object
    };

    readonly context: {
        readonly store: Store;
    };

    // tslint:disable-next-line:no-any
    constructor(props: NewBookingFormProps & NewBookingFormStep02Props, context: any) {
        super(props);
        this.context = context;

        // * init component state
        this.fetchServices();
        this.state = {
            services: []
        };
    }

    render() {
        const { services } = this.state;
        if (!services.length) {
            return null;
        }

        const { submitting } = this.props;

        return (
            <div>
                <List renderHeader="Tùy chọn">
                    <BookingAppointmentQuantity
                        store={this.context.store}
                        fieldName={nameof<NewBookingFormValue>(o => o.totalCustomer)}
                    />
                    <List.Item extra={<Field name="oneForAll" component={RenderSwitchField} />}>
                        <span>Dịch vụ giống nhau</span>
                    </List.Item>
                </List>
                <WhiteSpace size="xl" />
                <FieldArray
                    name="appointments"
                    component={this.renderAppointments}
                />
                <WhiteSpace size="xl" />
                <Field
                    name="totalPrice"
                    component={({ input }) => {
                        return (
                            <Button
                                type="primary"
                                loading={submitting}
                                onClick={() => {
                                    const submitAction = submit('booking-form');
                                    this.context.store.dispatch(submitAction);
                                }}
                            >
                                Hoàn tất {input.value && `(${formatCurrency(input.value)}) vnđ`}
                            </Button>
                        );
                    }}
                />
                <WhiteSpace />
            </div>
        );
    }

    readonly renderAppointments = ({ fields }) => {
        return fields.map((field, appointmentIndex) => {
            const renderHeader = (
                <Field
                    name={`${field}.title`}
                    component={({ input }) => {
                        return (
                            <div>
                                <div style={{ flex: 1 }}>
                                    <span>
                                        {`Khách hàng #${appointmentIndex + 1}`}
                                    </span>
                                </div>
                                {
                                    input.value ? (
                                        <div style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <span>{input.value}</span>
                                        </div>
                                    ) : null
                                }
                            </div>
                        );
                    }}
                />
            );

            return (
                <List
                    key={appointmentIndex}
                    renderHeader={renderHeader}
                >
                    <FieldArray
                        name={`${field}.appointmentContents`}
                        component={this.renderAppointmentContents}
                        appointmentIndex={appointmentIndex}
                    />
                    <List.Item>
                        <Button
                            size="small"
                            type="primary"
                            onClick={() => {
                                this.addAppoimentContent(appointmentIndex);
                            }}
                            style={{
                                color: '#096dd9',
                                backgroundColor: '#fff',
                            }}
                        >
                            Thêm dịch vụ +
                        </Button> 
                    </List.Item>
                </List>
            );
        });
    }

    readonly renderAppointmentContents = ({ fields, appointmentIndex }) => {
        return fields.map((field, appointmentContentIndex) => {
            return (
                <Field
                    key={appointmentContentIndex}
                    name={`${field}.serviceId`}
                    component={RenderPickerField}
                    inputProps={{
                        extra: 'Chọn',
                        data: this.state.groupServices,
                        onChange: (values: string[]) => {
                            this.oneForAllHandler(
                                appointmentIndex,
                                appointmentContentIndex,
                                values
                            );
                        },
                        format: (values: string[]) => {
                            if (values.length) {
                                return `${values[2]} phút`;
                            }
                        },
                        children: (value) => (
                            <List.Item arrow="horizontal" >
                                {
                                    value[1] ?
                                        (<span>{value[1]}</span>) :
                                        (<span>Chọn dịch vụ</span>)
                                }
                                {
                                    appointmentContentIndex !== 0 && (
                                        <React.Fragment>
                                            <WhiteSpace size="sm" />
                                            <Button
                                                style={{ width: 60 }}
                                                size="small"
                                                onClick={() =>
                                                    this.deleteAppointmentContent(
                                                        appointmentIndex,
                                                        appointmentContentIndex
                                                    )
                                                }
                                            >
                                                Xóa
                                            </Button>
                                        </React.Fragment>
                                    )
                                }
                            </List.Item>
                        )
                    }}
                />
            );
        });
    }

    readonly fetchServices = async () => {
        const { groupServicesByTime } = this;
        const { spaBranch } = this.props;

        const response = await restfulFetcher.fetchResource(
            serviceResources.getBySpaBranch,
            [{
                type: 'path',
                parameter: 'spaBranchId',
                value: spaBranch.id,
            }, {
                type: 'query',
                parameter: 'size',
                value: 1000,
            }]
        );
        const services: Service[] = response.content;
        const groupServices = lodash(services)
            .map(service => ({
                label: service.name,
                value: service.id,
                time: service.timeValue,
                serviceCategory: service.serviceCategory.name
            }))
            .groupBy('serviceCategory')
            .toPairs()
            .map((currentItem) => {
                return lodash.zipObject(
                    ['label', 'value', 'children'],
                    [currentItem[0], currentItem[0], groupServicesByTime(currentItem[1])]
                );
            })
            .value();

        this.setState({
            services: response.content,
            groupServices: groupServices
        });
    }

    readonly groupServicesByTime = (services: {
        readonly label: string;
        readonly value: number;
        readonly children: {};
    }) => {
        const chain = lodash(services)
            .groupBy('label')
            .toPairs()
            .map((current) => {
                const label = current[0];
                const value = current[0];
                const children = current[1].map(o => ({ value: String(o.value), label: String(o.time) }));
                return lodash.zipObject(
                    ['label', 'value', 'children'],
                    [label, value, children]
                );
            });
        return chain.value();
    }

    readonly deleteAppointmentContent =
        async (
            appointmentIndex: number,
            appointmentContentIndex: number
        ) => {
            const { change } = this.props;
            const { store } = this.context;
            const selector = formValueSelector('booking-form');
            const oneForAll = +selector(store.getState(), 'oneForAll');

            const allAppointments = [...selector(store.getState(), 'appointments')];

            if (oneForAll) {
                for (let index = 0; index < allAppointments.length; index++) {
                    const appointment = allAppointments[index];

                    const nextAppointmentContents = appointment.appointmentContents.filter(
                        (appointmentContents, appointmentContentLoopingIndex) =>
                            appointmentContentIndex !== appointmentContentLoopingIndex
                    );

                    change(
                        `appointments[${index}].appointmentContents`,
                        nextAppointmentContents
                    );

                    appointment.appointmentContents = nextAppointmentContents;
                }
            } else {
                const _appointment = allAppointments[appointmentIndex];
                const _nextAppointmentContents = _appointment.appointmentContents.filter(
                    (appointmentContents, appointmentContentLoopingIndex) =>
                        appointmentContentIndex !== appointmentContentLoopingIndex);

                change(
                    `appointments[${appointmentIndex}].appointmentContents`,
                    _nextAppointmentContents
                );

                _appointment.appointmentContents = _nextAppointmentContents;
            }

            this.calcTimeAndPriceForAppointments(allAppointments);
        }

    readonly addAppoimentContent = (currentAppointmentIndex: number) => {
        const { change } = this.props;
        const { store } = this.context;
        const reduxState = store.getState();
        const selector = formValueSelector('booking-form');
        const oneForAll = +selector(reduxState, 'oneForAll');

        const allAppointments = selector(reduxState, 'appointments');

        const initAppointmentContent = {};

        if (oneForAll) {
            for (let index = 0; index < allAppointments.length; index++) {
                const nextAppointmentContentIndex = allAppointments[0].appointmentContents.length;
                change(
                    `appointments[${index}].appointmentContents[${nextAppointmentContentIndex}]`,
                    initAppointmentContent
                );
            }
        } else {
            const _nextAppointmentContentIndex = allAppointments[currentAppointmentIndex].appointmentContents.length;
            change(
                `appointments[${currentAppointmentIndex}].appointmentContents[${_nextAppointmentContentIndex}]`,
                initAppointmentContent
            );
        }
    }

    readonly oneForAllHandler = (
        appointmentIndex: number,
        appointmentContentIndex: number,
        values: string[]
    ) => {
        const { change } = this.props;
        const { services } = this.state;

        const { store } = this.context;
        const reduxState = store.getState();
        const selector = formValueSelector('booking-form');
        const oneForAll = +selector(reduxState, 'oneForAll');

        const allAppointments = [...selector(reduxState, 'appointments')];

        if (oneForAll) {
            for (let index = 0; index < allAppointments.length; index++) {
                const appointment = allAppointments[index];
                const appointmentContent = appointment.appointmentContents[appointmentContentIndex];
                const serviceId = +values[2];
                appointmentContent.service = services.find(o => o.id === serviceId);

                if (index === appointmentContentIndex) {
                    continue;
                }

                appointmentContent.serviceId = values;

                change(
                    `appointments[${appointmentIndex}].appointmentContents[${appointmentContentIndex}]`,
                    { ...appointmentContent }
                );
            }
        } else {
            const serviceId = +values[2];
            const currentAppointment = allAppointments[appointmentIndex];
            const currentAppointmentContent = currentAppointment.appointmentContents[appointmentContentIndex];
            currentAppointmentContent.service = services.find(o => o.id === serviceId);
            currentAppointmentContent.serviceId = values;
        }

        this.calcTimeAndPriceForAppointments(allAppointments);
    }

    readonly calcTimeAndPriceForAppointments = (appointments: Appointment[]) => {
        const { change } = this.props;
        const { services } = this.state;
        let bookingTotalPrice = 0;

        for (const index in appointments) {
            if (!appointments.hasOwnProperty(index)) {
                continue;
            }
            const appointment = appointments[index];

            const time = appointment.appointmentContents.reduce(
                (prev, currentAppointmentContent) => {
                    if (!currentAppointmentContent.service) {
                        return prev;
                    }
                    const serviceId = +currentAppointmentContent.service.id;
                    const service = services.find(o => o.id === serviceId);
                    if (!service) {
                        return prev;
                    }
                    prev += service.timeValue;
                    return prev;
                },
                0
            );

            const price = appointment.appointmentContents.reduce(
                (prev, currentAppointmentContent) => {
                    if (!currentAppointmentContent.service) {
                        return prev;
                    }
                    const serviceId = +currentAppointmentContent.service.id;
                    const service = services.find(o => o.id === serviceId);
                    if (!service) {
                        return prev;
                    }
                    prev += service.price;
                    return prev;
                },
                0
            );

            bookingTotalPrice += price;
            change(`appointments[${index}].title`, `${time} phút - ${formatCurrency(price)}`);
        }

        change(`totalPrice`, bookingTotalPrice);
    }
}