
const axios = require('axios')
const twilio = require('twilio');
require('dotenv').config();


async function main(){
    const streetAddress = process.env.ADDRESS;
    const residential = await connectToRS(streetAddress);
    const msg = getSchedule(residential);
    console.log(msg);
    sendMessage(msg);
    
}
main();

async function connectToRS(streetAddress) {
   const republicServices=`https://www.republicservices.com/api/v1/addresses?addressLine1=${streetAddress}`;

    const response1 = await axios.get(republicServices);
    const addressHash = response1.data.data[0].addressHash;
    const api_url = `https://www.republicservices.com/api/v1/publicPickup?siteAddressHash=${addressHash}`;

    const data = await axios.get(api_url);
    const residential = data.data.data.residential;
    return residential;
}

function getSchedule(residential){
    var msg = '';
    var today = new Date();
    residential.forEach(waste => {
        if(waste.wasteTypeDescription.toLowerCase() === 'recycle'){
            waste.nextServiceDays.forEach(day =>{
                if(daysApart(today,day)>=0 && daysApart(today,day)<7 ){
                    msg += ("♻️");
                }
            })
        }else if(waste.wasteTypeDescription.toLowerCase() === 'solid waste'){
            msg+="🗑️";
        }else{
            if(daysApart(today,day)>=0 && daysApart(today,day)<7 ){
                msg+=waste.wasteTypeDescription;
            }
        }
    })
    return msg;
}

function daysApart(a,b){
    a=new Date(a);
    b=new Date(b);
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function sendMessage(msg){
    const accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
    const authToken = process.env.AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
    const client = new twilio(accountSid, authToken);

    client.messages
        .create({
            body: msg,
            to: process.env.TO, // Text this number
            from: process.env.FROM, // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
}