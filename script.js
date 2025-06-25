const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://alejonaranjo:alejo2402@alejandro.zn6aqic.mongodb.net/";
const dbName = "Tienda_de_borojo";

// Función 1: Calcular precio con descuento
function calcularDescuento(precio, porcentaje) {
if (typeof precio !== "number" || precio < 0) {
    console.log("Precio inválido. Debe ser un número positivo.");
    return;
}
if (typeof porcentaje !== "number" || porcentaje < 0 || porcentaje > 100) {
    console.log("Porcentaje inválido. Debe estar entre 0 y 100.");
    return;
}
  const resultado = precio - (precio * porcentaje / 100);
console.log(`Precio original: $${precio}, descuento: ${porcentaje}%, precio final: $${resultado.toFixed(2)}`);
}

// Función 2: Verificar si cliente está activo (más de 3 compras)
async function clienteActivo(idCliente) {
const client = new MongoClient(uri);
try {
    await client.connect();
    const db = client.db(dbName);

    // Probar primero como número
    let id = Number(idCliente);
    let cliente = await db.collection('clientes').findOne({ _id: id });

    // Si no se encuentra, probar como string
    if (!cliente) {
    cliente = await db.collection('clientes').findOne({ _id: idCliente });
    }

    if (!cliente) {
    console.log("Cliente no encontrado.");
    retur
    }

    const activo = cliente.compras && cliente.compras.length > 3;
    console.log(`Cliente ${cliente.nombre} está ${activo ? "activo/a" : "desactivo/a"}`);
} catch (error) {
    console.error("Error:", error);
} finally {
    await client.close();
}
}


// Función 3: Verificar stock suficiente para producto
async function verificarStock(productonombre, cantidadDeseada) {
if (typeof cantidadDeseada !== "number" || cantidadDeseada <= 0) {
    console.log("Cantidad deseada inválida. Debe ser un número positivo.");
    return;
}
const client = new MongoClient(uri);
try {
    await client.connect();
    const db = client.db(dbName);
    const producto = await db.collection('productos').findOne({ nombre: productonombre });
    if (!producto) {
    console.log("Producto no encontrado.");
    return;
    }
    const hayStock = producto.stock >= cantidadDeseada;
    console.log(`Producto "${producto.nombre}" tiene suficiente stock para ${cantidadDeseada} unidades? ${hayStock ? "Sí" : "No"}`);
} catch (error) {
    console.error("Error:", error);
} finally {
    await client.close();
}
}

// Control de ejecución según argumento
const accion = process.argv[2];
const parametro1 = process.argv[3];
const parametro2 = process.argv[4];

if (accion === "descuento") {
if (!parametro1 || !parametro2) {
    console.log("Debes escribir precio y porcentaje. Ejemplo:\nnode script.js descuento 10000 15");
} else {
    const precio = Number(parametro1);
    const porcentaje = Number(parametro2);
    calcularDescuento(precio, porcentaje);
}
} else if (accion === "clienteActivo") {
if (!parametro1) {
    console.log("Debes escribir el id del cliente. Ejemplo:\nnode script.js clienteActivo 1");
} else {
    let id = isNaN(parametro1) ? parametro1 : Number(parametro1);
    clienteActivo(id);
}
} else if (accion === "verificarStock") {
if (!parametro1 || !parametro2) {
    console.log("Debes escribir id de producto y cantidad deseada. Ejemplo:\nnode script.js verificarStock 2 10");
} else {
    let productonombre = isNaN(parametro1) ? parametro1 : Number(parametro1);
    let cantidad = Number(parametro2);
    verificarStock(productonombre, cantidad);
}
} else {
console.log("Comando no reconocido. Usa uno de estos:");
console.log("node app.js descuento <precio> <porcentaje>");
console.log("node app.js clienteActivo <idCliente>");
console.log("node app.js verificarStock <idProducto> <cantidad>");
}

