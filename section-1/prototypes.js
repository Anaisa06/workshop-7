function Person(nombre, apellido, edad, profesion, hobbies){
    this.nombre = nombre
    this.apellido = apellido
    this.edad = edad
    this.profesion = profesion
    this.hobbies = hobbies
}

Person.prototype.saludar = function(){
    return `Hola, soy ${this.nombre} ${this.apellido} y tengo ${this.edad} años`
}

function Student(nombre, apellido, edad, promedio, cursos) {
    Person.call(this, nombre, apellido, edad);
    this.promedio = promedio;
    this.cursos = cursos;
  }

Student.prototype = Object.create(Person.prototype)
Student.prototype.constructor = Student

Student.prototype.presentarExamen = function(){
    console.log("Estoy presentado un examen")
}

Student.prototype.presentarExamen()