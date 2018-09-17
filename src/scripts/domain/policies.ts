import { User } from '@/restful';

export const policies = {
    isAdminGroup: (user?: User) => {
        return true;
    }
};