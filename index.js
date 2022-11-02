const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
const Datastore = require('nedb');


app.listen(4000,()=>console.log('listening at 4000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request,response) => {
    const data = request.body;
    
})
app.get('/waste/:addressHash', async (request,res) => {
const addressHash = request.params.addressHash;
const api_url = `https://www.republicservices.com/api/v1/publicPickup?siteAddressHash=${addressHash}`;//`https://www.republicservices.com/api/v1/publicPickup?siteAddressHash=${addressHash}`;

      const response = await axios.get(api_url);
      console.log(response);
})
 