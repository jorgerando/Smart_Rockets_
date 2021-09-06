
class Poblacion{

  constructor(n_,inicio_,fin_,w_,h_,vida){

      this.tiempoVida = vida
      this.contador = 0
      this.generacion = 0
      this.individuos = []
      this.n =  n_
      this.inicio = inicio_.copy()
      this.fin = fin_
      this.w = w_
      this.h = h_
      this.inicialIndividuos(w_,h_)
      this.mejor
      this.recorDist = 0
      this.sumFitnes = 0
      this.exito = false

  }

  inicialIndividuos(w,h){

    for(var i = 0 ; i < this.n ; i++){
      this.individuos.push(new Cohete(this.w,this.h,this.inicio.copy()))
    }

  }

  moverse(obstaculos){

    for(var i = 0 ; i < this.n ; i++){

      this.individuos[i].moverse(obstaculos,this.fin)
      this.individuos[i].diriguir()
      this.individuos[i].verCohete()
      this.individuos[i].guardaCamino()



    }

  }

  verFinal(){
    if(!this.exito){
     fill(255)
    }else{
     fill(0,255,0)
    }
    stroke(0)
    ellipse(this.fin.x,this.fin.y,10,10)
  }

  mejor_(){

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
    this.mejor = mejor
    this.recorDist = dist_menor
    mejor.verCamino()
    //mejor.verCampo()
    fill(255,0,0,150)
    noStroke()
    ellipse(p.x,p.y,30,30)



  }

  verEstadisticas(){
    textSize(20)
    fill(150)

    text("Generacion : "+this.generacion, 10, 20);
    text("tiempo : "+this.contador, 10, 40);
    text("tiempoVida : "+this.tiempoVida, 10, 60);
  }

  CalcularFitnes(){

    var fitnesMedia = 0
    var mejorFit = 0
    var mejorIndividuo = 0
    var fitsum = 0

    for(var i = 0 ; i < this.n ; i++ ){
       var ind_v = this.individuos[i]
       ind_v.fit()
       var fitnes = ind_v.fitnes

       fitsum+=fitnes
       if(fitnes > mejorFit ){
         mejorFit = fitnes
         mejorIndividuo = ind_v

       }
    }

    this.fitnesMedia = fitsum/this.n
    this.sumFitnes = fitsum
  }

  actuar(){

    this.verFinal()
    console.log(this.n)
    if(this.contador <= this.tiempoVida){

     this.moverse(obstaculos,this.fin)
     this.mejor_()
     this.contador++

   }else{
     this.tieneExito()
     this.generacion++
     this.contador = 0
     this.CalcularFitnes()
     this.crearNuevaGeneracion()
     console.log(this.fitnesMedia)

   }


  }

  seleccionar(){

    var r = Math.random()
    var p_b = 0
    var p_a = 0

    for(var i = 0 ; i < this.n ; i++ ){

        var fit_a = this.individuos[i].fitnes

        p_a = p_a + (fit_a/this.sumFitnes)

        if ( r > p_b && r <= p_a ){
            return this.individuos[i]
        }
        p_b = p_a

    }

  }

  reproducir(){

    var madre = this.seleccionar()
    var padre = this.seleccionar()
    var hijo = madre.reproduccion(padre,0.01)

    return hijo

  }

  crearNuevaGeneracion(){
    var individuos_n = []
    for(var i = 0 ; i < this.n ; i++ ){
       individuos_n.push(this.reproducir())
    }
    this.individuos = individuos_n
  }

  tieneExito(){
    for(var i = 0 ; i < this.n ;i++){
       var ind_p = this.individuos[i].posicion.copy()
       var dist = p5.Vector.sub(ind_p,this.fin).mag()
       if(dist < 20){
         this.exito = true
       }

    }
  }



}
