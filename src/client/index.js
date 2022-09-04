// import {getFetch} from './js/getFetch';
import {geonameAPI} from './js/geoname';
import {weatherbit} from './js/weatherbit';
import {pixabay} from './js/pixabay';


const formElement = document.getElementById('form');
const content = document.getElementById('content');
formElement.addEventListener('submit',async (event)=>{
    event.preventDefault();
    //alert('hello!!');
    // getFetch();
    // let countryName = 'paris';
    let date = document.getElementById('date').value;
    // console.log("date: "+ date);
    let countryName = document.getElementById('country').value;
    let coordenates = await geonameAPI(countryName);
    
    console.log(coordenates.postalCodes[0].lng);
    console.log(coordenates.postalCodes[0].lat);
    console.log(coordenates.postalCodes[0].placeName);
    
    let forcast = await weatherbit(coordenates.postalCodes[0].lng,coordenates.postalCodes[0].lat);
    console.log('forcast data: ');
    console.log(forcast);
    for (let i = 0; i < forcast.data.length; i++) {
        if(date == forcast.data[i].datetime){
            content.innerHTML = `High: ${forcast.data[i].high_temp} <br> Low: ${forcast.data[i].low_temp} <br> Description: ${forcast.data[i].weather.description}`;
            console.log('high: '+ forcast.data[i].high_temp);
            console.log('low: '+ forcast.data[i].low_temp);
            console.log('description: '+ forcast.data[i].weather.description);
            
        }else{
            console.log('sorry, no data available')
        }
        
    }
    // console.log('high: '+ forcast.data[0].high_temp);
    // console.log('low: '+ forcast.data[0].low_temp);
    // console.log('description: '+ forcast.data[0].weather.description);
    
    let imageData = await pixabay(countryName);
    console.log(imageData);
    console.log(imageData.hits[0].previewURL);
    let image = document.createElement('img');
    image.setAttribute('src',imageData.hits[0].previewURL);
    content.appendChild(image);
});
// document.getElementById('btn').addEventListener('click',async ()=>{
//     //alert('hello!!');
//     // getFetch();
//     let countryName = 'paris';
//     let coordenates = await geonameAPI(countryName);
//     console.log(coordenates.postalCodes[0].lng);
//     console.log(coordenates.postalCodes[0].lat);
//     console.log(coordenates.postalCodes[0].placeName);

//     let forcast = await weatherbit(coordenates.postalCodes[0].lng,coordenates.postalCodes[0].lat);
//     console.log('forcast data: ');
//     console.log(forcast);
//     console.log('high: '+ forcast.data[0].high_temp);
//     console.log('low: '+ forcast.data[0].low_temp);
//     console.log('description: '+ forcast.data[0].weather.description);

//     let imageData = await pixabay(countryName);
//     console.log(imageData);
//     console.log(imageData.hits[0].previewURL);
// })