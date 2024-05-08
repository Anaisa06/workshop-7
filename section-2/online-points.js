//Crear usuario base
function UsuarioBase(nombre, clave, email){
    this.nombre = nombre
    this.clave = clave
    this.email = email
}

//Método ingresar para usuario base
UsuarioBase.prototype.ingresar = function(email, contraseña){
    if(this.email === email && this.clave === contraseña){
        console.log("Bienvenido")
    } else {
        console.log("Datos incorrectos")
    }     
}

//Prototipo Usuario de usuario base
function Usuario(nombre, clave, email, puntosAcumulados, edad, direccionEnvio){
    UsuarioBase.call(this, nombre, clave, email)
    this.puntosAcumulados = puntosAcumulados
    this.edad = edad
    this.direccionEnvio = direccionEnvio
}

Usuario.prototype = Object.create(UsuarioBase.prototype);
Usuario.prototype.constructor = Usuario;

//Métodos del prototipo usuario
Usuario.prototype.hacerActividad = function(){
    console.log("Has hecho una actividad")
}

Usuario.prototype.acumularPuntos = function(nuevosPuntos){
    this.puntosAcumulados += nuevosPuntos
    console.log("Estos son los nuevos puntos acumulados")
}

Usuario.prototype.canjearPuntos = function(producto){
    if(producto.puntosNecesarios <= this.puntosAcumulados){
        this.puntosAcumulados -= producto.puntosNecesarios
        console.log("Has canjeado tus puntos, tus nuevos puntos son: " + this.puntosAcumulados)
    } else {
        console.log("No tienes suficientes puntos para canjear")
    }
}

//Prototipo administrador del usuario base
function Administrador(nombre, clave, email, permisosAdmin ){
    UsuarioBase.call(this, nombre, clave, email)
    this.permisosAdmin = permisosAdmin
}

Administrador.prototype = Object.create(UsuarioBase.prototype)
Administrador.prototype.constructor = Administrador

//Métodos del administrador
Administrador.prototype.agregarProducto = function(lista, producto){
    lista.push(producto)
    console.log("Se ha agregado el producto")
}

Administrador.prototype.eliminarProducto = function(lista, producto){
    lista.splice(lista.indexOf(producto), 1)
    console.log("Se ha eliminado el producto")
}

Administrador.prototype.eliminarUsuario = function(lista, usuario){
    lista.splice(lista.indexOf(usuario, 1))
    console.log("Se ha eliminado el usuario")
}

//Crear producto
function Producto(nombre, puntosNecesarios, categoria, stock){
    this.nombre = nombre
    this.puntosNecesarios = puntosNecesarios
    this.categoria = categoria
    this.stock = stock
}

//Métodos de producto
Producto.prototype.obtenerInfo = function(){
    return (`Nombre: ${this.nombre} - Puntos necesarios: ${this.puntosNecesarios} - Cantidad disponible ${this.stock}`)
}

Producto.prototype.actualizarStock = function(nuevoStock){
    this.stock = nuevoStock
}

//Producto digital, prototipo de producto
function ProductoDigital(nombre, puntosNecesarios, categoria, stock, url){
    Producto.call(this, nombre, puntosNecesarios, categoria, stock)
    this.url = url
}

ProductoDigital.prototype = Object.create(Producto.prototype)
ProductoDigital.prototype.constructor = ProductoDigital

ProductoDigital.prototype.descargar = function(){
    if(confirm("¿Deseas descargar el contenido del producto?")){
        console.log("Producto descargado")
    } else {
        console.log("Operación cancelada")
    }
}

ProductoDigital.prototype.obtenerProductoEmail = function(email){
    console.log(`Producto enviado al email ${email}`)
}

function ProductoFisico(nombre, puntosNecesarios, stock, localizacion){
    Producto.call(this, nombre, puntosNecesarios, stock)
    this.localizacion = localizacion
}

ProductoFisico.prototype = Object.create(Producto.prototype)
ProductoFisico.prototype.constructor = ProductoFisico

ProductoFisico.prototype.enviarProducto = function(direccionEnvio){
    console.log("El producto será enviado a la dirección " + direccionEnvio)
}

function CategoriaProductos(nombre, descripcion){
    this.nombre = nombre
    this.descripcion = descripcion
}

CategoriaProductos.prototype.listarProductos = function(listaProductos){
    let mostrarProductos = `Productos de la categoría ${this.nombre}\nDescripción: ${this.descripcion}\n`
    listaProductos.forEach(producto => {
        mostrarProductos += `Nombre: ${producto.nombre}, puntos necesarios: ${producto.puntosNecesarios}` 
    })
    return mostrarProductos
}

function OrdenDeCanje(usuario, producto, fecha){
    this.usuario = usuario
    this.producto = producto
    this.fecha = fecha
}

OrdenDeCanje.prototype.confirmarOrden = function(){
    if(confirm("¿Desea confirmar la orden?")){
        console.log("Orden confirmada")
    } else {
        console.log("Orden cancelada")
    }
}

function Actividad(tipo, puntosOtorgados){
    this.tipo = tipo
    this.puntosOtorgados = puntosOtorgados
}

Actividad.prototype.completarActividad = function(){
 //Completar la actividad
}

Actividad.prototype.darPuntos = function(usuario){
    usuario.puntosAcumulados += this.puntosOtorgados
    console.log(`Puntos otorgados por la actividad: ${this.puntosOtorgados}\nNuevo acumulado del usuario: ${usuario.puntosAcumulados}`)
}

//Ejemplos de uso

//Ingreso
const usuarioEjemplo = new Usuario("Ana", 123, "ejemplo@gmail.com", 10, 25, "Calle 123")
usuarioEjemplo.ingresar("ejemplo@gmail.com", 123)

//Dar puntos al usuario
const nuevaActividad = new Actividad("Encuesta", 25)
nuevaActividad.darPuntos(usuarioEjemplo)

//Definir nuevo producto y añadir a lista de productos con el acceso del administrador
const listaProductos = []
const nuevoProductoDigital = new ProductoDigital("Libro digital", 15, "Libros", 3, "www.example.com")
const nuevoAdmin = new Administrador("Isabel", 456, "ejemplo@ejemplo.com", true)
nuevoAdmin.agregarProducto(listaProductos, nuevoProductoDigital)

//Definir nueva categoria y mostrar los productos de esa categoria
const nuevaCategoria = new CategoriaProductos("Libros", "Libros digitales o fisicos")
console.log(nuevaCategoria.listarProductos(listaProductos))

//Canjear puntos
usuarioEjemplo.canjearPuntos(nuevoProductoDigital)