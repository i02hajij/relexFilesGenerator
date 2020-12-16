const moment = require('moment'); 
//const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const minimist = require('minimist');

/************************/
/*    Parametrización   */
/************************/   

// Control de ficheros a genear
const generarPV = true;
const generarPR = true;
// directorio de salida de los ficheros
const directorioSalida = './output/'
// número de artículos por tienda para Previsión de Venta
const numPV = 7000;
// Número de artículos por propuesta de pedido
const numArticulosXPropuesta = 600;
// Número de tiendas a usar
const numTiendas = 1000;

// GENERACIÓN FICHERO PREVISIÓN DE VENTAS

//const lineaPV = 000065;T00188;2020-12-16;5.4;4.59;5.28;5.46;2.18;2.07;2.8;2.51;2.13;;2.54;1.01;1.61;2.17;W
const lineaPV = 'articulo;tienda;fechaC;5.4;4.59;5.28;5.46;2.18;2.07;2.8;2.51;2.13;;2.54;1.01;1.61;2.17;W';

const stringTienda = 'T';
const tienda = 1;
const fechaCalculo = moment().hour(8).minute(0).second(0).format("YYYY-MM-DD");

if(generarPV) {
    const articulo = 1;
    const ficheroPV = 'DIA_Second_Delivery_Forecast_' + fechaCalculo + '.csv';
    let writeStreamPV = fs.createWriteStream(directorioSalida + ficheroPV);
    
    for(let i = 1; i <= numTiendas; i++ ) {
        for (let j = 1; j<= numPV; j++) {
            let linea = lineaPV.replace('tienda', ('T' + i.toString().padStart(5, '0')))
                        .replace('articulo', j.toString().padStart(6, '0'))
                        .replace('fechaC', fechaCalculo);
            writeStreamPV.write(linea + '\n', () => {
            })
            //console.log(linea);    
        }
    }
    
    writeStreamPV.end();
    
    writeStreamPV.on('finish', () => {
        console.log('Generación el fichero de PV finalizada');
    }).on('error', (err) => {
        console.log(err)
    })    
}

// GENERACION FICHERO PROPUESTAS

//const lineaPR = T00188.2020-12-15.2020-12-17.09.00.09.20;000078;T00188;2020-12-15;2020-12-17;8469.0;W;10200.0;09:20;;07:15;09:00;09:00;12000.0;2020-12-18;8.469;10.2;12.0;0.0;true;F;true;2.0
const lineaPR = 'clave;articulo;tienda;fechaC;fecha2;8469.0;W;10200.0;09:20;;07:15;09:00;09:00;12000.0;fecha3;8.469;10.2;12.0;0.0;true;F;true;2.0';

if (generarPR) {
    const articulo = 1;
    const ficheroPr = 'DIA_Order_Proposals_' + fechaCalculo + '.csv';
    let writeStreamPr = fs.createWriteStream(directorioSalida + ficheroPr);
    
    const fechaC2 = moment().hour(8).minute(0).second(0).add(1, 'days').format("YYYY-MM-DD");
    const fechaC3 = moment().hour(8).minute(0).second(0).add(2, 'days').format("YYYY-MM-DD");
    
    for(let i = 1; i <= numTiendas; i++ ) {
        for (let j = 1; j<= numArticulosXPropuesta; j++) {
            let identificador = 'T' + i.toString().padStart(5, '0') + '.' + fechaCalculo + '.' + fechaC2 + '.09.00.09.20';
            let linea = lineaPR.replace('tienda', ('T' + i.toString().padStart(5, '0')))
                        .replace('articulo', j.toString().padStart(6, '0'))
                        .replace('fechaC', fechaCalculo)
                        .replace('fecha2', fechaC2)
                        .replace('fecha3', fechaC3)
                        .replace('clave', identificador);
            writeStreamPr.write(linea + '\n', () => {
            }) 
        }
    }
    
    writeStreamPr.end();
    
    writeStreamPr.on('finish', () => {
        console.log('Generación el fichero de PR finalizada');
    }).on('error', (err) => {
        console.log(err)
    })    
}


