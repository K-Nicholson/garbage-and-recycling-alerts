const express = require('express')
const app = express()
const cors = require('cors')
const Datastore = require('nedb');

app.listen(4000,()=>console.log('listening at 4000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.use(
    cors({
        origin:'*',//'http://127.0.0.1:5501/src/index.html',
        methods: ['GET'],//, DELETE, HEAD, OPTIONS,
        credentials: true

    })
)

app.post('/api', (request,response) => {
    const data = request.body;
    
})
