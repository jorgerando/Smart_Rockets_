var salir = true

var W = 1080
var H = 1350
var n_indv = 150
var vida = 450
var mins = 5

var inicio
var fin

var poblacion
var obstaculos = []
var obs_n = 12

function setup() {

  createCanvas(W,H)

  inicio = createVector(W/2,H -20)
  fin = createVector(W/2,20)
  //inicio = createVector(20,H/2)
  //fin = createVector(W-20,H/2)

  poblacion = new Poblacion(n_indv,inicio,fin,W,H,vida)

  for (var i = 0 ; i < obs_n ;i++){
      var obs =  new Obstaculo()
      obs.generarAleatoriamente(W,H,350)
      obstaculos.push(obs)
  }

}

function draw() {
  background(255);

 /*
  if ( frameCount == 1 ){
    capturer.start()
  }
 */

  for (var i = 0 ; i < obs_n ;i++){
      var obs =  obstaculos[i]
      obs.dibujar()
  }

  poblacion.actuar()
  poblacion.verEstadisticas()

/*
  if( !poblacion.exito ){
    capturer.capture(canvas)
  }else if( poblacion.exito && salir ) {
    capturer.save()
    capturer.stop()
    salir = false
  }
*/

}
