import { AppCoreContext, AppEventHandlers } from '@/app';
import { DomainContext } from '@/domain/Types';
import {
    restfulFetcher,
    Spa,
    SpaBranch,
    spaBranchResources,
    spaResources
} from '@/restful';

export const eventHandlers: AppEventHandlers = {
    onAppLoad: async (context) => {
        const domainContext = await Promise.all<Spa[], SpaBranch>([
            restfulFetcher.fetchResource(spaResources.getMySpa),
            restfulFetcher.fetchResource(spaBranchResources.getMySpaBranch)
        ]);

        return {
            ...context,
            currentSpa: domainContext[0][0],
            currentSpaBranch: domainContext[1]
        };
    },
    onPageLoad: (props) => {
        const { setAppContext } = props;

        setAppContext<DomainContext>({
        });
        setTimeout(
            () => {
                setAppContext<DomainContext>({
                    drawerVisibled: false
                });
            },
            100
        );
    }
};