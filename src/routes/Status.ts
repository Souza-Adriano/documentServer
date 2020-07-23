import { Request, Response } from 'express';
import Route from './Route';

export default class Status extends Route {
    
    constructor() {
        super();
        this.init();
    }

    public init(): void {
        this.router.get('/', this.server);
    }

    public server = async (Request: Request, Response: Response):Promise<void> => {
        Response.status(200).send('Server online !');
    }
}