// amar ta
/*
const express = require('express')
const app = express()
const port = 5000

const mongoDB = require("./db");
mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();

})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));

app.use('/api', require("./Routes/DisplayFood")); 

app.use('/api', require("./Routes/OrderData")); 

app.use('/api', require("./Routes/DisplayMerch")); 

app.use('/api', require("./Routes/OrderDataMerch")); 

app.use('/api', require('./Routes/Scheduler'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/
const express = require('express')
const app = express()
const port = 5000

const mongoDB = require("./db");
//const mongoDB = require("./db");

// MongoDB URI for laundry
const laundryMongoURI = "mongodb+srv://nafisahaque:Rz8vasEkrQgxxmzr@clusterlaundry.g45vtim.mongodb.net/?retryWrites=true&w=majority&appName=ClusterLaundry"; 
mongoDB(laundryMongoURI);

//mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();

})


app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));

app.use('/api', require("./Routes/DisplayFood")); 

app.use('/api', require("./Routes/OrderData")); 

app.use('/api', require("./Routes/DisplayMerch")); 

app.use('/api', require("./Routes/OrderDataMerch")); 

app.use('/api/slots', require("./Routes/slots"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
