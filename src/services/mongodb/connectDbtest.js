import { createConnection } from "mongoose";

const dbtest = await createConnection('mongodb+srv://hmdev:9fME3ipnbD7WeEHB@cluster0.mioi2f8.mongodb.net/test').asPromise();

export default dbtest;