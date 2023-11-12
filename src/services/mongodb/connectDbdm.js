import {createConnection} from 'mongoose';

//mongodb://<user>:<password><@host>/<database>?options
//mongoose.connect("mongodb+srv://hmdev:9fME3ipnbD7WeEHB@cluster0.mioi2f8.mongodb.net/?retryWrites=true&w=majority");
//mongoose.connect('mongodb+srv://hmdev:9fME3ipnbD7WeEHB@cluster0.mioi2f8.mongodb.net/test?retryWrites=true&w=majority');

const dbhm = await createConnection('mongodb+srv://hmdev:9fME3ipnbD7WeEHB@cluster0.mioi2f8.mongodb.net/dbhm').asPromise()

export default dbhm;