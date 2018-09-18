import { AppCoreContext } from '@/app';
import { Spa, SpaBranch, User } from '@/restful';

export interface DomainContext extends AppCoreContext<User> {
    readonly currentSpa?: Spa;
    readonly currentSpaBranch?: SpaBranch;
}