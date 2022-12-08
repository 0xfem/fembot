import path from 'node:path';
import { Sequelize } from 'sequelize';

import {
    addAdultChannel,
    deleteAdultChannel,
    getAllAdultChannels,
    initAdultChannel,
} from './adult-channel';

export class Database {
    static async init(dbPath: string = path.join(__dirname, '../../..')): Promise<void> {
        if (path.extname(dbPath) !== '.sqlite') {
            dbPath = path.join(dbPath, 'database.sqlite');
        }
        const sequelize = new Sequelize('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            database: 'FemBot Data',
            // SQLite only
            storage: dbPath, //'database.sqlite',
        });
        await initAdultChannel(sequelize);
    }
    static getAllAdultChannels = getAllAdultChannels;
    static addAdultChannel = addAdultChannel;
    static deleteAdultChannel = deleteAdultChannel;
}
