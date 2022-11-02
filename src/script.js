const addressHash = '1CB6C24A88C8B72D620A48AEEB9404E7';
const api_url = 'https://www.republicservices.com/api/v1/publicPickup?siteAddressHash=1CB6C24A88C8B72D620A48AEEB9404E7'
// const api_url = `waste/ ${addressHash}`;
// const json = await response.json();
// response.json(json);

async function getWasteInfo(){
    const options = {
        method: "GET",
        //body: JSON.stringify(data),
      };
      const response = await fetch(api_url,options);
      const json = await response.json();
      response.json(json);
      console.log(json);
}
getWasteInfo();
