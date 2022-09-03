import {getFetch} from './js/getFetch';
import {geonameAPI} from './js/geoname';
import {weatherbit} from './js/weatherbit';

document.getElementById('btn').addEventListener('click',async ()=>{
    //alert('hello!!');
    // getFetch();
    let coordenates = await geonameAPI('paris');
    console.log(coordenates.postalCodes[0].lng);
    console.log(coordenates.postalCodes[0].lat);
    console.log(coordenates.postalCodes[0].placeName);

    let forcast = await weatherbit(coordenates.postalCodes[0].lng,coordenates.postalCodes[0].lat);
    console.log('forcast data: ');
    console.log(forcast);
    console.log('high: '+ forcast.data[0].high_temp);
    console.log('low: '+ forcast.data[0].high_temp);
    console.log('description: '+ forcast.data[0].weather.description);
})