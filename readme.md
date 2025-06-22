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









