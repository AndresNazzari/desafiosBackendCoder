//>> Consigna: Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos 
//colecciones: mensajes y productos.
use ecomerce
db.createCollection("mensajes") 
db.createCollection("productos")

//1. Agregar 10 documentos con valores distintos a las colecciones mensajes y productos.
//El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable
//con base de datos MariaDB.
//2. Definir las claves de los documentos en relación a los campos de las tablas de esa base.
//En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores
//intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).

db.productos.insertMany([{ title: 'Escuadra', price: 120, thumbnail: 'https://' }, { title: 'Calculadora', price: 580, thumbnail: 'https://' }, { title: 'Globo Terráqueo', price: 900, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png' }, { title: 'Cámara', price: 1280, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png' }, { title: 'Escuadra', price: 1700, thumbnail: 'https://' }, { title: 'Calculadora', price: 2300, thumbnail: 'https://' }, { title: 'Globo Terráqueo', price: 2860, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png' }, { title: 'Cámara', price: 3350, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png' }, { title: 'Escuadra', price: 4320, thumbnail: 'https://' }, { title: 'Calculadora', price: 4890, thumbnail: 'https://' }])
db.mensajes.insertMany([{ "email": "andres@andres.com", "date": "26/3/2022 19:52:06", "text": "mensaje 1" }, { "email": "pepe@andres.com", "date": "26/3/2022 19:52:12", "text": "mensaje 2" }, { "email": "andres@andres.com", "date": "26/3/2022 19:52:06", "text": "mensaje 3" }, { "email": "pepe@andres.com", "date": "26/3/2022 19:52:12", "text": "mensaje 10" }, { "email": "andres@andres.com", "date": "26/3/2022 19:52:06", "text": "mensaje 4" }, { "email": "pepe@andres.com", "date": "26/3/2022 19:52:12", "text": "mensaje 5" }, { "email": "andres@andres.com", "date": "26/3/2022 19:52:06", "text": "mensaje 6" }, { "email": "pepe@andres.com", "date": "26/3/2022 19:52:12", "text": "mensaje 7" }, { "email": "andres@andres.com", "date": "26/3/2022 19:52:06", "text": "mensaje 8" }, { "email": "pepe@andres.com", "date": "26/3/2022 19:52:12", "text": "mensaje 9" }])

//3. Listar todos los documentos en cada colección.

db.productos.find()
db.mensajes.find()

//4. Mostrar la cantidad de documentos almacenados en cada una de ellas.
db.productos.count({ price: { $gt: -1 } })
db.mensajes.count({ email: {$type:"string"}})

//5. Realizar un CRUD sobre la colección de productos:
//a) Agregar un producto más en la colección de productos
db.productos.insertOne({ title: 'Nuevo producto', price: 3333, thumbnail: 'https://' })

//b) Realizar una consulta por nombre de producto específico:
//I) Listar los productos con precio menor a 1000 pesos.
db.productos.find({ price: { $lt: 1000 } })
//II) Listar los productos con precio entre los 1000 a 3000 pesos.
db.productos.find({ price: { $gt: 1000, $lt: 3000 } })
//II) Listar los productos con precio mayor a 3000 pesos.
db.productos.find({ price: { $gt: 3000 } })
//IV) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
db.productos.find({}).sort({ price: 1 }).skip(2).limit(1)
//c)Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
db.productos.updateMany({}, { $set: { stock: 100 } })
//d)Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 
db.productos.updateMany({price:{$gt:4000}}, { $set: { stock:0 } })
//e)Borrar los productos con precio menor a 1000 pesos 
db.productos.deleteMany({ price: { $lt: 1000 } })

//6. Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce.
//Verificar que pepe no pueda cambiar la información.
use admin
db.createUser({ user: "pepe", pwd: "asd456", roles: [{ role: "read", db: "ecomerce" }] })

mongo - u pepe - p asd456
db.productos.find()
db.createUser({ user: "pepe", pwd: "asd456", roles: [{ role: "read", db: "ecomerce" }] })