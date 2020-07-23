import { Router } from 'express';


export default abstract class Route {
    public router = Router();
    constructor() {}

    public abstract init(): void
}