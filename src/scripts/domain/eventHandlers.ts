import { AppCoreContext, AppEventHandlers } from '@/app';

export const eventHandlers: AppEventHandlers = {
    onAppLoad: async (context: AppCoreContext) => {
        return context;
    },
    onPageLoad: (props) => {
        const { setAppContext } = props;

        setAppContext({
            // Clear app's context here 
        });
    }
};