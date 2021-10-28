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
             'appid': process.env.OPENWEATHERMAP_KEY,
             'units': 'metric',
             'lang': 'es' 
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
 
            const intances  = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather, lat, lon}
            });
    
            const resp = await intances.get();
            const {weather, main} = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
                
            
        } catch (error) {
            console.log(error);
            return []; 
        }




    }

}

module.exports = Busquedas;