//Servicio de entrega de comida

//Definir persona como base
function Persona(nombre, clave, email){
    this.nombre = nombre
    this.clave = clave
    this.email = email
}

//Método de Persona para ingresar
Persona.prototype.ingresar = function(email, contraseña){
    if(this.email === email && this.clave === contraseña){
        console.log("Bienvenido")
    } else {
        console.log("Datos incorrectos")
    }     
}

//Define cliente como prototipo de Persona
function Cliente(nombre, clave, email, direccion, historial){
    Persona.call(this, nombre, clave, email)
    this.direccion = direccion
    this.historial = Array.isArray(historial) ? historial : []
}

Cliente.prototype = Object.create(Persona.prototype)
Cliente.prototype.constructor = Cliente

//Método de Cliente para generar un pedido (crea una instancia de la clase pedido y añade el pedido al historial personal)
Cliente.prototype.realizarPedido = function(restaurante, plato, detalles){
    console.log("Pedido realizado en el restaurante " + restaurante.nombre)
    this.historial.push({
        restaurante,
        plato,
        detalles
    })
    return new Pedido(this.nombre, restaurante, plato, detalles, "nuevo") 
}

//Ver historial de pedidos
Cliente.prototype.historialPedidos = function(){
    let mostrarHistorial = "Este es el historial de tus pedidos: \n"
    this.historial.forEach(pedido => {
        mostrarHistorial += `Restaurante: ${pedido.restaurante.nombre}, plato: ${pedido.plato.nombre}, detalles: ${pedido.detalles}\n`
    })
    console.log(mostrarHistorial)
}

//Ver menu de un restaurante
Cliente.prototype.verMenu = function(restaurante){
    let verMenu = "Menú del restaurante " + restaurante.nombre
    restaurante.menu.forEach(plato => {
        verMenu += `\nPlato: ${plato.nombre}, precio: $${plato.precio}, descripción: ${plato.descripcion}` 
    })
    console.log(verMenu)
}

//Crear Repartidor como prototipo de Persona
function Repartidor(nombre, clave, email, vehiculo, disponibilidad, ubicacion){
    Persona.call(this, nombre, clave, email)
    this.vehiculo = vehiculo
    this.disponibilidad = disponibilidad
    this.ubicacion = ubicacion
}

Repartidor.prototype = Object.create(Persona.prototype)
Repartidor.prototype.constructor = Repartidor


//Métodos de Repartidor
Repartidor.prototype.actualizarUbicacion = function(nuevaUbicacion){
    this.ubicacion = nuevaUbicacion
}

Repartidor.prototype.completarEntrega = function(pedido){
    pedido.estado = "completado"
    console.log("Pedido completado")
}

Repartidor.prototype.actualizarEstado = function(){
    this.disponibilidad = !this.disponibilidad
}

//Crear Restaurante
function Restaurante(nombre, menu){
    this.nombre = nombre
    this.menu = Array.isArray(menu) ? menu : []
}

//Métodos de Restaurante
Restaurante.prototype.agregarPlato = function(nombrePlato, precioPlato, descripcionPlato, ingredientes, disponibilidad){
    const nuevoPlato = new Plato (nombrePlato, precioPlato, descripcionPlato, ingredientes, disponibilidad)
    this.menu.push(nuevoPlato)
    console.log("Plato agregado existosamente a tu menú")
    return nuevoPlato
}

Restaurante.prototype.eliminarPlato = function(nombrePlato){
    this.menu,splice(this.menu.findIndex(plato => {
        plato.nombrePlato === nombrePlato
    }), 1)
    console.log(`El plato ${nombrePlato} ha sido eliminado de tu menú`)
}

//Crear Plato
function Plato(nombre, precio, descripcion, ingredientes, disponibilidad){
    this.nombre = nombre
    this.precio = precio
    this.descripcion = descripcion
    this.ingredientes = ingredientes
    this.disponibilidad = disponibilidad
}

//Crear Pedido
function Pedido(cliente, restaurante, platos, detalles, estado){
    this.cliente = cliente
    this.restaurante = restaurante
    this.platos = platos
    this.detalles = detalles
    this.estado = estado
}

Pedido.prototype.calcularTotal = function(){
    const total = this.platos.reduce((acumulado, plato) => {
        return acumulado + plato.precio
    }, 0)
    console.log(`El total del pedido es de $${total}`)
}

//Ejemplos de uso

//Crear restaurante
const nuevoRestaurante = new Restaurante("La Casa Colombiana", [])
//Añadir un nuevo plato al menu
const bandeja = nuevoRestaurante.agregarPlato("Bandeja Paisa", 20000, "Bandeja paisa completa", "Frijoles, arroz, aguacate, chorizo", true)
nuevoRestaurante.agregarPlato("Ajiaco", 25000, "Clásico ajiaco con pollo", "Pollo, papa, crema de leche", true)

//Crear nuevo cliente
const nuevoCliente = new Cliente("Luisa", 123, "email", "dirección", [])
//Ver menú del restaurante
nuevoCliente.verMenu(nuevoRestaurante)
//Hacer pedido
const nuevoPedido = nuevoCliente.realizarPedido(nuevoRestaurante, bandeja, "Enviar cubiertos desechables")
//Ver historial de pedidos
nuevoCliente.historialPedidos()

//Crear repartidor
const nuevoRepartidor = new Repartidor("María", 234, "email", "automovil", true, "ubicación")
//Completar el pedido
nuevoRepartidor.completarEntrega(nuevoPedido)
//Verificar el nuevo estado
console.log(nuevoPedido)

