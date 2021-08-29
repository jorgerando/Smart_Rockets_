
class Poblacion{

  constructor(n_,inicio_,fin_,w_,h_){

      this.individuos = []
      this.n =  n_
      this.inicio = inicio_.copy()
      this.fin = fin_
      this.w = w_
      this.h = h_
      this.inicialIndividuos(w_,h_)

  }

  inicialIndividuos(w,h){

    for(var i = 0 ; i < this.n ; i++){
      this.individuos.push(new Cohete(this.w,this.h,this.inicio.copy()))
    }

  }

  moverse(obstaculos){

    for(var i = 0 ; i < this.n ; i++){

      this.individuos[i].moverse(obstaculos)
      this.individuos[i].diriguir()
      this.individuos[i].verCohete()
      this.individuos[i].guardaCamino()



    }

  }

  verFinal(){
    fill(255)
    stroke(0)
    ellipse(this.fin.x,this.fin.y,10,10)
  }

  mejor(){

    var dist_menor = 1000000 ;
    var mejor = ""

    for(var i = 0 ; i < this.n ; i++){

        var in_a = this.individuos[i] ;
        var p = in_a.posicion.copy()
        var dist = p5.Vector.sub(p,this.fin.copy())

        if( dist.mag() < dist_menor ){
          dist_menor = dist.mag()
          mejor = in_a
        }
    }

    var p = mejor.posicion.copy()
    mejor.verCamino()
    fill(255,0,0,150)
    noStroke()
    ellipse(p.x,p.y,30,30)



  }



}
