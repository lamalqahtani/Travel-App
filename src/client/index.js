import {getFetch} from './js/getFetch';
import {geonameAPI} from './js/geoname';

document.getElementById('btn').addEventListener('click',()=>{
    alert('hello!!');
    // getFetch();
    geonameAPI('paris');
})