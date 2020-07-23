import { middlewares, routes, loaders, env } from './config/config';
import Server from './server';

const App = new Server({
    middlewares,
    routes,
    loaders,
    port: env.get('PORT', 3000)
});

App.start()
    .catch(console.error);