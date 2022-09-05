import {geonameAPI} from './js/geoname';
import {weatherbit} from './js/weatherbit';
import {pixabay} from './js/pixabay';
import './styles/style.scss'

//Global Variables and Constants
const formElement = document.getElementById('form');
const modalTitle = document.getElementById('exampleModalLabel');
const modalBodyContainer = document.getElementById('modal-body-id');
const modalBody = document.getElementById('modal-body-id');
const saveButton = document.getElementById('save');
formElement.addEventListener('submit',async (event)=>{
    event.preventDefault();

    let date = document.getElementById('date').value;
    let countryName = document.getElementById('country').value;

    //making sure the user inserted inputs
    if(!date || !countryName || countryName == '' ){
        saveButton.style.display = 'none';
        modalTitle.textContent = 'Oops';
        modalBody.innerHTML = `<p> Please, inser Date and Place to visit so we can provide you with the trip details.</p>`; 
        return;
    }

    let coordenates = await geonameAPI(countryName);
    
    console.log(coordenates.postalCodes[0].lng);
    console.log(coordenates.postalCodes[0].lat);
    console.log(coordenates.postalCodes[0].placeName);
    modalTitle.textContent = 'Trip to ' + countryName;
    
    let forcast = await weatherbit(coordenates.postalCodes[0].lng,coordenates.postalCodes[0].lat);
    console.log('forcast data: ');
    console.log(forcast);

    // current date with yyyy-mm-dd format => new Date().toISOString().slice(0, 10)
    let currentDate = new Date().toISOString().slice(0, 10);
    if(currentDate > date){
        modalBody.innerHTML = 'Date expired';
        saveButton.style.display = 'none';
        return;
    }
    //displaying save button again since there is no other mistakes by the user
    saveButton.style.display = null; 

    let found = false;
    for (let i = 0; i < forcast.data.length; i++) {
        if(date == forcast.data[i].datetime){
            modalBody.innerHTML = `<p> High: ${forcast.data[i].high_temp} <br> Low: ${forcast.data[i].low_temp} <br> Description: ${forcast.data[i].weather.description} </p>`; 
            found = true;
        }  
    }
    if(found){
        let imageData = await pixabay(countryName);
        let placeImage = document.createElement('img');
        placeImage.setAttribute('src',imageData.hits[0].previewURL);
        modalBodyContainer.appendChild(placeImage); 
    }else{
        modalBody.innerHTML = `<p> No forcast data found</p>`; 
    }


});

export{
    geonameAPI,
    weatherbit,
    pixabay
}