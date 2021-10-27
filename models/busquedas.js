const axios = require('axios');

class Busquedas{

    historial = ['Popayán', 'Bogota', 'pitalito'];

    constructor(){
       // TODO: leer DB si existe;
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather(){
        return{
            
        }
    }

    async ciudad( lugar = '' ){
        // TODO: peticion HTTP
        //console.log('Ciudad: ',lugar);
        try {

            const intances  = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const resp = await intances.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lgn: lugar.center[0],
                lat: lugar.center[1]
            })); // retornar los lugares
        } catch (error) {
            return []; 
        }
        
    }

    async climaLugar(lat, lon){

        try {
            //intance
            const resp = await axios.get(`api.openweathermap.org/data/2.5/weather?lat=2.45917&lon=-76.60028&appid=8f918d3a7319a25c5ed46f9e49851728&units=metric&lang=es`)
            //resp.data
            console.log(resp.data);
            //retornar objecto
            return{
               desc: '',
               min: '',
               max: '',
               temp: '' 
            }
            
        } catch (error) {
            console.log(error);
            return [];
        }

    }

}

module.exports = Busquedas;