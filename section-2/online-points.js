function UsuarioBase(nombre, clave, email){
    this.nombre = nombre
    this.clave = clave
    this.email = email
}

UsuarioBase.prototype.ingresar = function(email, contraseña){
    if(this.email === email && this.clave === contraseña){
        console.log("Bienvenido")
    } else {
        console.log("Datos incorrectos")
    }     
}

function Usuario(nombre, clave, email, puntosAcumulados, edad, direccionEnvio){
    UsuarioBase.call(this, nombre, clave, email)
    this.puntosAcumulados = puntosAcumulados
    this.edad = edad
    this.direccionEnvio = direccionEnvio
}

Usuario.prototype = Object.create(UsuarioBase.prototype);
Usuario.prototype.constructor = Usuario;

Usuario.prototype.hacerActividad = function(){
    console.log("Has hecho una actividad")
}

Usuario.prototype.acumularPuntos = function(nuevosPuntos){
    this.puntosAcumulados += nuevosPuntos
    console.log("Estos son los nuevos puntos acumulados")
}

Usuario.prototype.canjearPuntos = function(puntosNecesarios){
    if(puntosNecesarios <= this.puntosAcumulados){
        this.puntosAcumulados -= puntosNecesarios
        console.log("Has canjeado tus puntos, tus nuevos puntos son: " + this.puntosAcumulados)
    } else {
        console.log("No tienes suficientes puntos para canjear")
    }
}

function Administrador(nombre, clave, email, permisosAdmin ){
    UsuarioBase.call(this, nombre, clave, email)
    this.permisosAdmin = permisosAdmin
}

Administrador.prototype = Object.create(UsuarioBase.prototype)
Administrador.prototype.constructor = Administrador

Administrador.prototype.agregarProducto = function(lista, producto){
    lista.push(producto)
    console.log("Se ha agregado el producto")
}


