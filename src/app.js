const express=require('express')
const path= require('path')
const hbs=require('hbs')
const { registerHelper } = require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app= express()
const port= process.env.PORT || 3000

// setup path for express config
const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// setup views location and handler engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Shubham patel'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About me',
        name:'Shubham patel'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title:'Help',
        name:'Shubham patel',
        helpText:'Welcome to help page'

    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:' You must provide a address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecastdata:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
    
}
)

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404 help',
        name:'Shubham patel',
        errormassage:'help artical not find'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Shubham patel',
        errormassage:"Page not found"
    })
})

app.listen( port ,()=>{
    console.log('Server is up on port '+port)
})
