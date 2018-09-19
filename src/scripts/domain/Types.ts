import { AppCoreContext } from '@/app';
import { Spa, SpaBranch, User } from '@/restful';
import { Customer } from '@/restful/resources/customer';

export interface DomainContext extends AppCoreContext<User> {
    readonly currentSpa?: Spa;
    readonly currentSpaBranch?: SpaBranch;
    readonly customers?: Customer[];
}