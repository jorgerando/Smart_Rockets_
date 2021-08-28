

class  Cohete {

   constructor(w,h,posicion_inicial ){

     this.camino = []
     this.inc_w = 0
     this.inc_h = 0
     this.inicializarCamino(w,h)
     this.posicion = posicion_inicial
     this.velocidad = createVector(1,1)
     this.velocidad_deseada
     this.vMax = 5
     this.acelarecion = createVector(0,0)

   }

   inicializarCamino(width,height){

     var inc_w = width/20
     var inc_h = height/20
     var camino = []

     for(var x = 0 ; x < width ; x += inc_w){

        var columna = []

        for(var y = 0 ; y < height ; y += inc_h ){
          columna.push( p5.Vector.random2D() )
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

   verCamino(){

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

   moverse(){

     this.velocidad.add(this.acelarecion)
     this.posicion.add(this.velocidad)
     this.acelarecion.mult(0)

   }

   aplicarFuerza(fuerza){
     //jiji no tiene masa asi que asumo asi ;)
    this.acelarecion = fuerza ;
   }

   verCohete(){

     push()
       translate(this.posicion.x,this.posicion.y)
       noFill()
       rectMode(CENTER)
       rotate(this.velocidad.heading())
       rect(0,0,10,5)
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

      this.velocidadDeseada()
      var f_d = p5.Vector.sub(this.velocidad_deseada.copy().mult(this.vMax), this.velocidad.copy() );
      f_d.normalize()
      this.aplicarFuerza(f_d)


   }

}
