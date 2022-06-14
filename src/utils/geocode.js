const request=require('request')


// geocode function 
const geocode=(address,callback)=>{
    const url='http://www.mapquestapi.com/geocoding/v1/address?key=V0otNMz2L2bljUfUd16QkZkcYuOtN7iK&location='+address+''
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect!!',undefined)
        }else if(response.body.results[0]===0){
            callback('Unable to  find a location !!',undefined)
        }else{
            callback(undefined,{
                latitude:response.body.results[0].locations[0].latLng.lat,
                longitude:response.body.results[0].locations[0].latLng.lng,
                location:{city:response.body.results[0].locations[0].adminArea5,
                state:response.body.results[0].locations[0].adminArea3,
            country:response.body.results[0].locations[0].adminArea1}
            })
        }
    })
}

module.exports=geocode