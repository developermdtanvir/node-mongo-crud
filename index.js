const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
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
        const userCollection = client.db("foodExpress").collection('user');
        // const user = { name: 'Tanvir', email: 'info@gmail.com' };
        // const result = await userCollaetion.insertOne(user);
        // console.log(`User instrated with id ${result.insertedId}`);


        // post request
        app.post('/user', async (req, res) => {
            const user = req.body;
            console.log(user, 'User recived');
            const result = await userCollection.insertOne(user);
            result.id = result.insertedId
            res.send(result);
        })

        // get request
        app.get('/user', async (req, res) => {
            const query = {}

            const cursor = userCollection.find(query);
            const user = await cursor.toArray();
            console.log(user);
            res.send(user);
        })

        app.get('/user/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        // update user put 

        app.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            const updateUser = req.body;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updateDoc = {
                $set: {
                    name: updateUser.name,
                    email: updateUser.email
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            console.log(id);
            const result = await userCollection.deleteOne(query);
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
