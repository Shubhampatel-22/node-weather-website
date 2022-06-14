const request=require('request')

// forecasting function
const forecast=(lat,lng,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=24452194e96015811d5c9fcb85d3ccf7&query='+lat+','+lng+'&units=m'

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect!!', undefined)
        }else if(body.error){
            callback('Unable to find a location !!', undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+'.it is currently '+body.current.temperature+' degree out. it feels like '+body.current.feelslike+' degree out.')
            
        }
    })
}


module.exports=forecast