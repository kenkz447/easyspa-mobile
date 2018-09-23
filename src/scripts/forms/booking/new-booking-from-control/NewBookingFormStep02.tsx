import { Button, List, WhiteSpace, WingBlank } from 'antd-mobile';
import React from 'react';
import { Store } from 'redux';
import {
    Field,
    FieldArray,
    formValueSelector,
    InjectedFormProps
} from 'redux-form';

import { withAppContext } from '@/app';
import { RenderPickerField, RenderSwitchField } from '@/components';
import { DomainContext } from '@/domain';
import {
    Appointment,
    restfulFetcher,
    Service,
    serviceResources
} from '@/restful';
import { formatCurrency } from '@/utilities';

import {
    createBookingFormName,
    NewBookingFormStep01Props,
    NewBookingFormValue
} from './NewBookingFormStep01';

const lodash = require('lodash');

interface NewBookingFormStep02Props extends InjectedFormProps<
    NewBookingFormValue,
    NewBookingFormStep01Props
    > {
    readonly submit: () => void;
}

interface NewBookingFormStep02State {
    readonly services: Service[];
    readonly groupServices?: {
        readonly [key: string]: Service[]
    };
}

@withAppContext<DomainContext>('currentSpaBranch')
export class NewBookingFormStep02 extends React.Component<
NewBookingFormStep01Props & NewBookingFormStep02Props,
NewBookingFormStep02State,
{ readonly store: Store; }> {
    constructor(props: NewBookingFormStep01Props & NewBookingFormStep02Props) {
        super(props);
        const store = this.context;
        const selector = formValueSelector(createBookingFormName);
        const totalCustomer = +selector(store.getState(), 'totalCustomer');

        const appointments: Partial<Appointment>[] = [];
        for (let index = 0; index < totalCustomer; index++) {
            appointments.push({
                // tslint:disable-next-line:no-any
                appointmentContents: [{}] as any
            });
        }

        this.props.change('appointments', appointments);

        // * Function binds
        this.renderAppointments = this.renderAppointments.bind(this);
        this.renderAppointmentContents = this.renderAppointmentContents.bind(this);

        // * init component state
        this.fetchServices();
        this.state = {
            services: []
        };
    }

    render() {
        if (!this.state.services) {
            return null;
        }

        const { submit } = this.props;
        return (
            <div>
                <List renderHeader={() => 'Tùy chọn'}>
                    <List.Item extra={<Field name="oneForAll" component={RenderSwitchField} />}>
                        <span>Dịch vụ giống nhau</span>
                    </List.Item>
                </List>
                <FieldArray
                    name="appointments"
                    component={this.renderAppointments}
                />
                <WingBlank>
                    <WhiteSpace />
                    <Field
                        name="totalPrice"
                        component={({ input }) => {
                            return (
                                <Button
                                    type="primary"
                                    onClick={submit}
                                >
                                    Hoàn tất {input.value && `(${formatCurrency(input.value)}) vnđ`}
                                </Button>
                            );
                        }}
                    />
                    <WhiteSpace />
                </WingBlank>
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
                            <div style={{ backgroundColor: '#F5F5F9' }}>
                                <WhiteSpace />
                                <WingBlank>
                                    <div style={{ flex: 1 }}>
                                        <span>
                                            {`Khách #${appointmentIndex + 1}`}
                                        </span>
                                    </div>
                                    {
                                        input.value ? (
                                            <div style={{ flex: 1, alignItems: 'flex-end' }}>
                                                <span>{input.value}</span>
                                            </div>
                                        ) : null
                                    }
                                </WingBlank>
                                <WhiteSpace />
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
                    <List.Item
                        extra={(
                            <Button
                                size="small"
                                type="primary"
                                onClick={() => {
                                    this.addAppoimentContent(appointmentIndex);
                                }}
                            >
                                thêm +
                            </Button>
                        )}
                    >
                        Thêm dịch vụ
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
                        onChange: (values: string[]) =>
                            this.oneForAllHandler(appointmentIndex, appointmentContentIndex, values),
                        formatValues: (values: string[]) => {
                            if (values.length) {
                                return `${values[2]} phút`;
                            }
                        },
                        placeholder: (value) => (
                            <List.Item arrow="horizontal" >
                                {
                                    value[1] ?
                                        (<span>{value[1]}</span>) :
                                        (<span>Trống</span>)
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

    groupServicesByTime(services: {
        readonly label: string;
        readonly value: number;
        readonly children: {};
    }) {
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

    async deleteAppointmentContent(appointmentIndex: number, appointmentContentIndex: number) {
        const { change } = this.props;
        const store = this.context;
        const selector = formValueSelector(createBookingFormName);
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

    addAppoimentContent(currentAppointmentIndex: number) {
        const { change } = this.props;
        const store = this.context;
        const selector = formValueSelector(createBookingFormName);
        const oneForAll = +selector(store.getState(), 'oneForAll');

        const allAppointments = selector(store.getState(), 'appointments');

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

    oneForAllHandler(appointmentIndex: number, appointmentContentIndex: number, values: string[]) {
        const { change } = this.props;
        const { services } = this.state;

        const store = this.context;
        const selector = formValueSelector(createBookingFormName);
        const oneForAll = +selector(store.getState(), 'oneForAll');

        const allAppointments = [...selector(store.getState(), 'appointments')];

        if (oneForAll) {
            for (let index = 0; index < allAppointments.length; index++) {
                const appointment = allAppointments[index];
                const appointmentContents = appointment.appointmentContents[appointmentContentIndex];
                const serviceId = +values[2];
                appointmentContents.service = services.find(o => o.id === serviceId);

                if (index === appointmentContentIndex) {
                    continue;
                }

                appointmentContents.serviceId = values;

                change(
                    `appointments[${appointmentIndex}].appointmentContents[${appointmentContentIndex}]`,
                    { ...appointmentContents }
                );
            }
        } else {
            const serviceId = +values[2];
            const currentAppointment = allAppointments[appointmentIndex];
            const currentAppointmentContent = currentAppointment.appointmentContents[appointmentContentIndex];
            currentAppointmentContent.service = services.find(o => o.id === serviceId);
        }

        this.calcTimeAndPriceForAppointments(allAppointments);
    }

    calcTimeAndPriceForAppointments(appointments: Appointment[]) {
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

    reCalcAppointmentContentHourAndMinute() {
        // ..
    }
}