var W = 1000
var H = 400
var n_indv = 50

var inicio
var fin


var poblacion
var obstaculos = []
var obs_n = 5

var A
var B

function setup() {

  createCanvas(W,H)

  inicio = createVector(20,H/2)
  fin = createVector(W-10,H/2)

  poblacion = new Poblacion(n_indv,inicio,fin,W,H)

  for (var i = 0 ; i < obs_n ;i++){
      var obs =  new Obstaculo()
      obs.generarAleatoriamente(W,H,200)
      obstaculos.push(obs)
  }

}

function draw() {
  background(255);


  for (var i = 0 ; i < obs_n ;i++){
      var obs =  obstaculos[i]
      obs.dibujar()
  }

    poblacion.moverse(obstaculos)
    poblacion.mejor()
    poblacion.verFinal()


}
