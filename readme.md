# 🧆 Base de datos Tienda de borjó:

## 📊 Consultas:

### 📒 Inserción:
1.
``` js
db.productos.insertOne(
  { "_id": 11, "nombre": "Chocolatina de borojó", "categoria": "Snack", "precio": 4000, "stock": 35, "tags": ["dulce", "energía"] }
)
```
Inserta un nuevo producto llamado "Chocolatina de borojó", categoría "Snack", con precio 4000, stock 35, y tags ["dulce", "energía"].

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20175346.png)


2. 
```js
db.clientes.insertOne(
  { "_id": 11, "nombre": "Mario Mendoza", "email": "mario@email.com", "compras": [], "preferencias": ["energético", "natural"] }
)
```
Inserta un nuevo cliente que se llama "Mario Mendoza", con correo "mario@email.com", sin compras, y preferencias "energético" y "natural".

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20180027.png)




### 📑 Lectura:

1.
```js
db.productos.find(
 { stock: { $gt: 20 } }
)
```
Consulta todos los productos que tengan stock mayor a 20 unidades.

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20185332.png)

2.
```js
db.clientes.find({
  $or: [
    { compras: { $exists: false } },
    { compras: { $size: 0 } }
  ]
})
```
Consulta los clientes que no han comprado aún ningún producto.

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20185913.png)




### 📚 Actualización 

1.
```js
db.productos.updateOne(
  { nombre: "Borojó deshidratado" },
  { $inc: { stock: 10 } }
)
```
Aumenta en 10 unidades el stock del producto "Borojó deshidratado".

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20190305.png)

2.
```js
db.productos.updateMany(
  { categoria: "Bebida" },
  { $addToSet: { tags: "bajo azúcar" } }
)
```
Añade el tag "bajo azúcar" a todos los productos de la categoría "Bebida".

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20190723.png)




### 🗑️ Eliminación:

1.
```js
db.clientes.deleteOne(
  {email: "juan@email.com"}
)
```
Elimina el cliente que tenga el correo "juan@email.com".

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20192200.png)

2.
```js
db.productos.deleteMany(
{ stock: { $lt: 5 } }
)
```
Elimina todos los productos con stock menor a 5 (considera esto como un proceso de limpieza de inventario).

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20192443.png)




### 📠 Expresiones regulares:

1.
```js
db.productos.find(
{ nombre: /^Boro/ }
)
```
Buscar productos cuyo nombre empiece por "Boro".

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20192746.png)

2.
```js
db.productos.find
({ nombre: { $regex: /\bcon\b/i } }
)
```
Encuentra productos cuyo nombre contenga la palabra "con" (como en “Concentrado de borojó”).

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20194057.png)

3.
```js
    db.clientes.find
({ nombre: { $regex: /z/i } }
)
```
Encuentra clientes cuyo nombre tenga la letra "z" (insensible a mayúsculas/minúsculas).

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20194649.png)




### 📑 Consultas sobre arrays:

1.
```js
db.clientes.find(
{ preferencias: "natural" }
)
```
Busca clientes que tengan "natural" en sus preferencias.

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20213631.png)


2.
```js
db.productos.find(
    { tags: { $all: ["natural", "orgánico"] } }
    )

```
Encuentra productos que tengan al menos los tags "natural" y "orgánico" (usa $all).

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20213855.png)


3.
```js
db.productos.find(
  {$expr: {$gt: [{$size: "$tags"}, 1]}}
)
```
Enuentra los productos que tienen mas de un tag.

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20214143.png)

Tambien con mas de dos tagas: 
```js
db.productos.find(
  {$expr: {$gt: [{$size: "$tags"}, 2]}}
)
```

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20214311.png)




### 💾 Aggregation Framework con Pipelines:

1.
```js
db.ventas.aggregate([
  { $unwind: "$productos" },
  { 
    $group: {
      _id: "$productos.productoId",
      totalUnidadesVendidas: { $sum: "$productos.cantidad" }
    }
  },
  {
    $lookup: {
      from: "productos",
      localField: "_id",
      foreignField: "_id",
      as: "producto"
    }
  },
  { $unwind: "$producto" },
  {
    $project: {
      _id: 0,
      nombre: "$producto.nombre",
      totalUnidadesVendidas: 1
    }
  },
  { $sort: { totalUnidadesVendidas: -1 } }
])
```
Muestra un listado de los productos más vendidos (suma total de unidades vendidas por producto).

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20214746.png)


2. 
```js
db.clientes.aggregate([
  {
    $project: {
      nombre: 1,
      cantidadCompras: { $size: "$compras" }
    }
  },
  {
    $group: {
      _id: "$cantidadCompras",
      clientes: { $push: "$nombre" },
      totalClientes: { $sum: 1 }
    }
  },
  {
    $sort: { _id: -1 }
  },
  {
    $project: {
      _id: 0,
      compras: "$_id",
      clientes: 1,
      totalClientes: 1
    }
  }
])
```
Agrupa clientes por cantidad de compras realizadas.

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20215807.png)


3.
```js
db.ventas.aggregate([
  {
    $group: {
      _id: { mes: { $month: "$fecha" } },
      totalVentas: { $sum: "$total" },
      cantidadVentas: { $sum: 1 }
    }
  },
  {
    $sort: { "_id.mes": 1 }
  }
])
```
Muestra el total de ventas por mes (usa $group y $month).

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20220128.png)


4.
```js
db.productos.aggregate([
  {
    $group: {
      _id: "$categoria",
      precioPromedio: { $avg: "$precio" },
      cantidadProductos: { $sum: 1 }
    }
  },
  {
    $sort: { precioPromedio: -1 }
  }
])
```
Calcula el promedio de precios por categoría de producto.

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20220413.png)


5.
```js
db.productos.find()
  .sort({ stock: -1 })
  .limit(3)
```
Muestra los 3 productos con mayor stock (orden descendente con $sort y $limit).

![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20220611.png)





## 🛠️ Funciones:

### Calcular decuento:
![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20225015.png)

### Verificar si un cliente esta activo o no:
![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20232049.png)

### Verificar si hay el suficiente stock para realizar una compra:
![evidencia](evidencias/Captura%20de%20pantalla%202025-06-21%20231609.png)







