import { AppCoreContext } from '@/app';
import { User } from '@/restful';

export const policies = {
    isAdminGroup: (context: AppCoreContext) => {
        return true;
    }
};