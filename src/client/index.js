import {getFetch} from './js/getFetch';
import {geonameAPI} from './js/geoname';

document.getElementById('btn').addEventListener('click',async ()=>{
    //alert('hello!!');
    // getFetch();
    let coordenates = await geonameAPI('paris');
    console.log(coordenates.postalCodes[0].lng);
    console.log(coordenates.postalCodes[0].lat);
    console.log(coordenates.postalCodes[0].placeName);
})