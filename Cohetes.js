

class  Cohete {

   constructor(w,h,posicion_inicial){

     this.camino = []
     this.inc_w = 0
     this.inc_h = 0
     this.inicializarCamino(w,h)
     this.w = w
     this.h = h
     this.inicio =  posicion_inicial.copy()
     this.posicion = posicion_inicial.copy()
     this.velocidad = createVector(random(-1,1),random(-1,1))
     this.velocidad_deseada
     this.vMax = 4
     this.acelarecion = createVector(0,0)
     this.ruta = []
     this.ruta.push(this.posicion.copy())
     this.choque =  false
     this.teminar = false
     this.distanciaRecord = 1000000
     this.fitnes = 0
     this.tiempoLlegar = 100000
     this.contador = 0

   }

   inicializarCamino(width,height){

     var inc_w = width/10
     var inc_h = height/10
     var camino = []

     for(var x = 0 ; x < width ; x += inc_w){

        var columna = []

        for(var y = 0 ; y < height ; y += inc_h ){
          var r = p5.Vector.random2D()
          columna.push( r )
       }
       camino.push(columna)
     }

     this.camino = camino
     this.inc_h = inc_h
     this.inc_w = inc_w

   }

   drawArrow(base, vec, myColor) {

    push();
     stroke(myColor);
     strokeWeight(1);
     fill(myColor);
     translate(base.x, base.y);
     line(0, 0, vec.x, vec.y);
     rotate(vec.heading());
     let arrowSize = 4;
     translate(vec.mag() - arrowSize, 0);
     triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();

}

   verCampo(){

     var n  = 8
     for(var x = 0 ; x < this.camino.length ; x ++){
        for(var y = 0 ; y < this.camino[0].length ; y ++ ){

           var vector_actual = this.camino[x][y]
           var posicion_vector = createVector(x*this.inc_w,y*this.inc_h)
           var centro = createVector(posicion_vector.x+(this.inc_w/2),posicion_vector.y+(this.inc_h/2))
           var final = createVector(posicion_vector.x+vector_actual.x*n,posicion_vector.y+vector_actual.y*n)

           this.drawArrow(centro,vector_actual.copy().mult(8),'black')

           var x_a = Math.floor(this.posicion.x / this.inc_w)
           var y_a = Math.floor(this.posicion.y / this.inc_h)
           if(x_a == x && y_a == y){
            fill(255,0,0,100)
           }else{
           noFill()
           }
           rect(posicion_vector.x,posicion_vector.y,this.inc_w,this.inc_h)

        }
      }

   }

   moverse(obs,fin){
     if (!this.colision(obs)){
       this.velocidad.add(this.acelarecion)
       this.posicion.add(this.velocidad)
       this.acelarecion.mult(0)
       this.contador++ ;
       this.record(fin)
       this.llegar(fin)
     }

   }

   aplicarFuerza(fuerza){
     //jiji no tiene masa asi que asumo asi ;)
    this.acelarecion = fuerza ;
   }

   verCohete(){

     stroke(0)
     strokeWeight(1);
     push()
       translate(this.posicion.x,this.posicion.y)
       rotate(this.velocidad.heading())
       fill(255)
       rectMode(CENTER)
       rect(0,0,6,3)
     pop()


   }

   velocidadDeseada(){


      var x = Math.floor(this.posicion.x / this.inc_w)
      var y = Math.floor(this.posicion.y / this.inc_h)

      var v_campo = this.camino[x][y].copy()
      //this.aplicarFuerza(v_campo)

      this.velocidad_deseada = v_campo

   }

   diriguir(){

      if(!this.choque){
      this.velocidadDeseada()
      }else{
      this.velocidad_deseada = createVector(0,0)
      }
      var f_d = p5.Vector.sub(this.velocidad_deseada.copy().mult(this.vMax), this.velocidad.copy() );
      this.aplicarFuerza(f_d.limit(0.1))


   }

   colision(obstaculos){
     var choque_pared_x = this.posicion.x > this.w -5 || this.posicion.x < 0+5
     var choque_pared_y = this.posicion.y > this.h -5 || this.posicion.y < 0+5
     for(var i = 0 ; i < obstaculos.length ; i++){
        var obs =  obstaculos[i]
        if (obs.colision(this.posicion) || choque_pared_x || choque_pared_y){
            this.choque = true
            return true
        }
     }
     this.choque = choque_pared_x || choque_pared_y
     return choque_pared_x || choque_pared_y


   }

   guardaCamino(){
     if( frameCount%2 == 0 && !this.choque ){
        this.ruta.push( this.posicion.copy() )
     }

   }

   verCamino(){



      strokeWeight(2);
      stroke(237, 34, 93,200);
      beginShape(LINES);

      for(var i = 1 ; i < this.ruta.length ; i++ ){

          vertex(this.ruta[i-1].x,this.ruta[i-1].y);
          vertex(this.ruta[i].x,this.ruta[i].y);



      }
      endShape();
   }

   record(fin){
     var d = p5.Vector.sub(fin,this.posicion)
     var mag = d.mag()
     if (mag < this.distanciaRecord) {
       this.distanciaRecord = mag
     }
   }

   llegar(fin){

     var tiempoLlegar_ = 0
     var d = p5.Vector.sub(fin,this.posicion)
     var mag = d.mag()
     if (mag < 10 ) {
       this.terminar = true

     }else {
       this.tiempoLlegar = this.contador


     }

   }

   fit(){

      var d = p5.Vector.sub(fin,this.posicion)
      var d = d.mag()
      var fit = 1/(d)
      fit = pow(fit,2)

      if( this.choque ){ fit= fit *0.1 }
      if( this.terminar ){ fit=fit * 2 }

      this.fitnes = fit
      return fit

    }

   darCamino(camino_){
     this.camino = camino_

    }

   reproduccion(padre,tasa){

     var nuevoCamino = []

     for(var x = 0 ; x < this.camino.length ; x ++){
        var columna = []
        for(var y = 0 ; y < this.camino[0].length ; y ++ ){
          var r

          if(x > this.w/2){
            r = padre.camino[x][y]
          }else{
            r = this.camino[x][y]
          }
          columna.push( r )
       }
       nuevoCamino.push(columna)
     }

     var nuevo_Individuo = new Cohete(this.w,this.h,this.inicio)
     nuevo_Individuo.darCamino(nuevoCamino)
     nuevo_Individuo.mutar(tasa)
     return nuevo_Individuo

   }

   mutar(tasa){
     for(var x = 0 ; x < this.camino.length ; x ++){

        for(var y = 0 ; y < this.camino[0].length ; y ++ ){
            var r = Math.random()
            if(r<tasa){
              this.camino[x][y]= p5.Vector.random2D()

            }
        }
      }

   }

}
