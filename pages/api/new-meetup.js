import { MongoClient } from 'mongodb';
import { resolveHref } from 'next/dist/next-server/lib/router/router';

// /api/new-meetup

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body; // body is the data of incoming request

        // const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://watsum08:marcmeynet08@cluster0.axn5j.mongodb.net/meetups');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data); // no need to destruct object passed in
    
        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup inserted!!' });
    }
};

export default handler;