require('dotenv').config()

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

console.log(process.env.MAPBOX_KEY);

const main = async() => {

    const busquedas = new Busquedas();
    let opt;
    

    do {
        
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensajes
                const termino = await leerInput('Ciudad: ');

                //Buscar los lugares
                const lugares = await busquedas.ciudad(termino);

                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find(l => l.id === id);

                // Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lgn);
                console.log(clima)

                //Mostrar resultados
                console.log('\n Información de la ciudad \n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat );
                console.log('Lng:', lugarSel.lgn);
                console.log('Temperatura:', );
                console.log('Mínima:', );
                console.log('Maxima:', );
                console.log('Cómo está el clima:', );
                break;

            case 2:
                console.log('Seleciono la opcion 2');
                break;
        
            default: 0
                break;
        }

        if (opt !== 0 ) await pausa();


    } while ( opt !== 0 );

}

main();