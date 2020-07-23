function getter(propertie: string, def: string): string;
function getter(propertie: string, def: number): number;
function getter(propertie: string, def: string | number): number | string {
    if(typeof def === 'string') {
        return process.env[propertie]
            ? process.env[propertie] as string
            : def;
    }

    else {
        return process.env[propertie]
            ? parseInt(process.env[propertie] as string)
            : def;
    }
};

import dotenv from 'dotenv';
dotenv.config({path: `${process.cwd()}/.env`});

export default {
    get: getter,

    set: (propertie: string, value: any) => {
        process.env[propertie] = value;
    },

    list: () => {
        Object.keys(process.env);
    }
}