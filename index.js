const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(cors());
app.use(express.json());

//userName : admin1
// password : KcpagiArOAa8SKBR



const uri = "mongodb+srv://admin1:KcpagiArOAa8SKBR@cluster0.338egrb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

async function run() {
    try {
        await client.connect()
        const userCollaetion = client.db("foodExpress").collection('user');
        // const user = { name: 'Tanvir', email: 'info@gmail.com' };
        // const result = await userCollaetion.insertOne(user);
        // console.log(`User instrated with id ${result.insertedId}`);

        app.post('/user', async (req, res) => {
            const user = req.body;
            console.log(user, 'User recived');
            const result = await userCollaetion.insertOne(user);
            console.log(result.insertedId)
            res.send(result);
        })
    }
    finally {
        // await client.close();
    }
}


app.get('/', (req, res) => {
    res.send('My Mongodb server is ready')
})

app.listen(port, () => console.log(`listinign port ${port}`))

run().catch(console.dir);
