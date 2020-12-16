1.- Clonar el repositorio
2.- Ejecutar npm install para instalar dependencias
3.- Parametrizar según se desee. Las variables a modificar son:

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

4.- Ejecutar con node src/index.js
5.- Los ficheros se generan en la carpeta output
