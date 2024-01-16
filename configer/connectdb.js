const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(`${DATABASE_URL}/${DB_NAME}`, {
    useNewUrlParser: true,
    useunifiedTopology: true
}).then(() => {
    console.log('Connected');
}).catch((err) =>{
    console.log(err);
})

