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

                if (id === '0') continue;

                const lugarSel = lugares.find(l => l.id === id);

                //Guardar en DB
                busquedas.agregarHistorial( lugarSel.nombre );

                // Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lgn);

                //Mostrar resultados
                console.clear();
                console.log('\n Información de la ciudad \n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat );
                console.log('Lng:', lugarSel.lgn);
                console.log('Temperatura:', clima.temp );
                console.log('Mínima:', clima.min );
                console.log('Maxima:', clima.max );
                console.log('Cómo está el clima:', clima.desc );
                break;

            case 2:

            busquedas.historialCapitalizar.forEach( ( lugar, i ) =>{ 

                const idx = `${i + 1}.`.green;
                console.log(`${ idx } ${ lugar }`);
            });

            break;
        
            default: 0
                break;
        }

        if (opt !== 0 ) await pausa();


    } while ( opt !== 0 );
    console.clear();

}

main();