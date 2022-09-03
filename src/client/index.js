// import {getFetch} from './js/getFetch';
import {geonameAPI} from './js/geoname';
import {weatherbit} from './js/weatherbit';
import {pixabay} from './js/pixabay';


const formElement = document.getElementById('form');
formElement.addEventListener('submit',async (event)=>{
    event.preventDefault();
    //alert('hello!!');
    // getFetch();
    // let countryName = 'paris';
    let countryName = document.getElementById('country').value;
    let coordenates = await geonameAPI(countryName);
    
    console.log(coordenates.postalCodes[0].lng);
    console.log(coordenates.postalCodes[0].lat);
    console.log(coordenates.postalCodes[0].placeName);
    
    let forcast = await weatherbit(coordenates.postalCodes[0].lng,coordenates.postalCodes[0].lat);
    console.log('forcast data: ');
    console.log(forcast);
    console.log('high: '+ forcast.data[0].high_temp);
    console.log('low: '+ forcast.data[0].low_temp);
    console.log('description: '+ forcast.data[0].weather.description);
    
    let imageData = await pixabay(countryName);
    console.log(imageData);
    console.log(imageData.hits[0].previewURL);
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