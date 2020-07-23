import express, { Application } from 'express';

interface ServerConfig {
    port: number;
    middlewares: any;
    routes: any;
    loaders: Loader[];
}

export interface Loader {
    load(): Promise<void>
}

export default class Server {
    private config: ServerConfig;
    private port: number;
    private app: Application;

    constructor(config : ServerConfig) {
        this.config = config;
        this.port = config.port;
        this.app = express();

        this.middlewares(config.middlewares);
        this.routes(config.routes);
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach((middleWare) => this.app.use(middleWare));
    }

    private async load(list: Loader[]): Promise<void> {
        for (const loader in list) {
            await list[loader].load();
        }
    }

    private routes(routes: { forEach: (arg0: (routes: any) => void) => void; }) {
        routes.forEach((route) => this.app.use('/', route.router));
    }

    public async start() {
        await this.load(this.config.loaders);
        this.app.listen(this.port, () => {
            console.log(`Server started on ${this.port}`);
            console.log(`http://127.0.0.1:${this.port}/`);
        });
    }

}