var W = 1000
var H = 400

var cohete
var obstaculos = []
var obs_n = 5

function setup() {
  createCanvas(W,H)
  cohete = new Cohete(W,H,createVector(W/2,H/2))
  for (var i = 0 ; i < obs_n ;i++){
      var obs =  new Obstaculo()
      obs.generarAleatoriamente(W,H,200)
      obstaculos.push(obs)

  }
}

function draw() {
  background(255);
  cohete.verCamino()
  cohete.moverse(obstaculos)
  cohete.verCohete()
  cohete.diriguir()

  for (var i = 0 ; i < obs_n ;i++){
      var obs =  obstaculos[i]
      obs.dibujar()
  }

  cohete.colision(obstaculos)


}
