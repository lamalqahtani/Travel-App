//Get Lat and Lng By Country Name
export function geonameAPI(country){
    fetch(`http://api.geonames.org/postalCodeSearchJSON?placename=${country}&style=short&maxRows=1&username=lamiaa2q`)
    .then(res=>res.json())
    .then(data=>console.log(data));
}