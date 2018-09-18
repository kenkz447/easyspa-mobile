import { DomainContext } from './Types';

export const policies = {
    isAdminGroup: (context: DomainContext) => {
        return true;
    }
};