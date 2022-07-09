//import { connection } from 'mongoose';

const {MongoClient} = require('mongodb');
const url = process.env.MONGO_URL;

let db;

async function getConnection(){

    if (db) {
        return db;
    }

    try {
        const conn = new MongoClient(url);
        await conn.connect();

        db = conn.db("PeriodTracker");

        return db;

    } catch (e) {
        console.error(e);
    }
}

// async function doInsert() {

//     let dbo = await getConnection();

//     var myobj = { name: "Company Inc", address: "Highway 37" };

//         const cycleDetails = {
//                     cycle_number: 1,
//                     start_date: '1 Sep 2022',
//                     end_date: '2 Sep 2022',
//                     flow_details: [{
//                         day: '1',
//                         flow_strength: "medium"
//                     },
//                     {
//                         day: '2',
//                         flow_strength: "heavy"
//                     }]
//                 }

//         dbo.collection("johann_test").insertOne(cycleDetails, function(err, res) {
//           if (err) throw err;
//           console.log("1 document inserted");
//         });
// }

module.exports.getConnection = getConnection();