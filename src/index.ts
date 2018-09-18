import { startup } from './scripts';

startup();

if (module.hot) {
    module.hot.accept(['./scripts'], () => {
        const nextStartup = require('./scripts').startup;
        nextStartup();
    });
}