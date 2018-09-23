import { Moment } from 'moment';
import * as React from 'react';
import { Form, reduxForm } from 'redux-form';

import { BaseForm } from '@/components';
import { Omit } from '@/domain';
import { Booking, SpaBranch } from '@/restful';

import { NewBookingFormStep01 } from './NewBookingFormStep01';
import { NewBookingFormStep02 } from './NewBookingFormStep02';

export const createBookingFormName = 'booking-form';

export interface NewBookingFormValue extends
    Omit<Booking, 'totalCustomer' | 'date'> {
    readonly date: Date;
    readonly dayTime: Date;
    readonly totalCustomer: string[];
}

export interface NewBookingFormProps {
    readonly spaBranch: SpaBranch;
}

export interface NewBookingFormComponentState {
    readonly currentStep: number;
}

export class NewBookingFormComponent extends BaseForm<
    NewBookingFormValue,
    NewBookingFormProps,
    NewBookingFormComponentState
    > {

    readonly state: NewBookingFormComponentState = {
        currentStep: 1
    };

    render() {
        const { handleSubmit } = this.props;
        const { currentStep } = this.state;
        return (
            <Form onSubmit={handleSubmit}>
                {
                    (currentStep === 1) ?
                        <NewBookingFormStep01
                            {...this.props}
                            next={() => this.setState({ currentStep: 2 })}
                        /> :
                        <NewBookingFormStep02
                            {...this.props}
                            prev={() => this.setState({ currentStep: 1 })}
                        />
                }
            </Form>
        );
    }
}

export const NewBookingForm = reduxForm<NewBookingFormValue, NewBookingFormProps>({
    form: createBookingFormName
})(NewBookingFormComponent);