
const request = require('request')

const forecast=(lat,logi,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=01f61465784c8c687dce22db42c69f53&query='+lat+','+logi+'&units=f'
 
    request({url,json:true},(error,{body})=>{
        if(error){
    callback('Unable to connect to weather service ',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            console.log(body.current)
            const data ={
                desciption:body.current.weather_descriptions[0],
                temp:body.current.temperature ,
                feelslike: body.current.feelslike
            }
            callback(undefined,data)

        }
    
    })
}

module.exports=forecast



