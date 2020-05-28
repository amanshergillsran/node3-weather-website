const path = require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

// setup handle bar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
res.render('index',{
    title:'Weather ',
    name:'Aman'
})
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About ',
        name:'Aman'
    })
    })
    app.get('/help',(req,res)=>{
        res.render('help',{
            title:'Help ',
            name:'Aman'
        })
        })
app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'You must provide an Address'
        })
    }
    
        geocode(req.query.address,(error,{lat,longi,location}={})=>{
            if(error){
                return res.send({error})
              }
      else{
       forecast(lat, longi, (error, forecastdata) => {
           if(error){
            return res.send({error})
           }
           else{
           res.send(
            {
                address:req.query.address,
                forcast:forecastdata.desciption + " Today temp is " + forecastdata.temp,
                location
            }
            )
           }
         })
      }}
       )

    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Aman',
        error:'Help article not found'
    })
    })
app.get('*',(req,res)=>{
res.render('404',{
    title:'404 ',
    name:'Aman',
    error:'Page Not Found'
})
})
app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})