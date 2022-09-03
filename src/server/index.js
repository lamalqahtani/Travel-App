const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());

app.use(express.static('dist'));


//routes
app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

app.get('/test', function (req, res) {
    res.json({'msg':'tested'});
})

//get coordenates
app.post('/api/geoname', async (req,res)=>{
    console.log(req.body.countryName);
    let response = await fetch(`http://api.geonames.org/postalCodeSearchJSON?placename=${req.body.countryName}&style=short&maxRows=1&username=${process.env.USER_NAME}`)
    
    try{
        let data = await response.json();
        console.log(data);
        res.json(data);
    }catch(error){
        console.log(error);
    }
});

// get weather forcast
app.post('/api/weatherbit', async (req,res)=>{
    console.log(req.body.lng);
    console.log(req.body.lat);
    let response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.API_KEY_WEATHERBIT}&lat=${req.body.lat}&lon=${req.body.lng}`)
    
    try{
        let data = await response.json();
        console.log(data);
        res.json(data);
    }catch(error){
        console.log(error);
    }
});

// get image
app.post('/api/pixabay', async (req,res)=>{
    console.log(req.body.countryName);
    let response = await fetch(`https://pixabay.com/api/?key=${process.env.API_KEY_PIXABAY}&q=${req.body.countryName}&image_type=photo`)
    
    try{
        let data = await response.json();
        console.log(data);
        res.json(data);
    }catch(error){
        console.log(error);
    }
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})