var W = 1000
var H = 400

var cohete

function setup() {
  createCanvas(W,H)
  cohete = new Cohete(W,H,createVector(W/2,H/2))

}

function draw() {
  background(255);
  cohete.verCamino()
  cohete.moverse()
  cohete.verCohete()
  cohete.diriguir()

}
