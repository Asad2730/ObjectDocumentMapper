import express from "express";
import * as mongoose from 'mongoose';
import router from "./src/routes";

const app = express();
const db_uri = '';

async function startServer():Promise<void> {
    try {
        await mongoose.connect(db_uri);
        app.use(express.json());
        app.use('/api',router)
        app.listen(80, () => console.log('Server running on port 80'));
    } catch (ex) {
        throw ex;
    }
}

(() => {
    return new Promise<void>((resolve, reject) => {
        startServer()
            .then(() => {
                resolve();
            })
            .catch((ex) => {
                reject(ex);
            });
    });
})();
