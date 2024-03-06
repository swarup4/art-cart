require('dotenv').config()
// const cluster = require('cluster');
// const os = require('os');
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const controller = require('./modules');

const app = express();
// const cpus = os.cpus().length;
const port = process.env.PORT;


// if (cluster.isMaster) {
//     console.log(cpus);
//     for (let i = 0; i < cpus; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', function (worker) {
//         console.log(`worker ${worker.id} exited, respawning...`);
//         console.log(`worker ${worker.process.pid} died`);
//         cluster.fork();
//     });
// } else {

    
    mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database has Connected");
    }).catch(err => {
        console.log("Error : " + err);
    });

    app.use(cors());

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(controller);

    app.listen(port, () => {
        console.log('Server is running on port no ' + port);
    });
// }