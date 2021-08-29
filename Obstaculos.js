
class Obstaculo{

   constructor(){
     this.p1
     this.p2
   }

   crear(P1,P2){
     this.p1 = P1
     this.p2 = P2
   }

   generarAleatoriamente(w,h,r){
     this.p1 = createVector( random(w) , random(h) )
     this.p2 = createVector(this.p1.x + random(20,r) , this.p1.y + random(20,r) )
   }

   dibujar(){
     noStroke()
     var l1 = this.p2.x - this.p1.x
     var l2 = this.p2.y - this.p1.y
     fill(0)
     rect(this.p1.x,this.p1.y,l1,l2)
   }

   colision(p){

    var colision_x = p.x < this.p2.x && p.x > this.p1.x
    var colision_y = p.y < this.p2.y && p.y > this.p1.y
    if (colision_x && colision_y){
       console.log("colision")
    }

    return colision_x && colision_y

   }

}
