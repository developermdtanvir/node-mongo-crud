const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());

//userName : admin1
// password : KcpagiArOAa8SKBR



const uri = "mongodb+srv://admin1:KcpagiArOAa8SKBR@cluster0.338egrb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log('mongodb connected');
    // perform actions on the collection object
    client.close();
});



app.get('/', (req, res) => {
    res.send('My Mongodb server is ready')
})

app.post('/addUser', (req, res) => {
    res.send('Post request click')
})

app.listen(port, () => console.log(`listinign port ${port}`))


