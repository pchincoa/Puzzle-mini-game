//#######################################
// Pannel Objekt

class Pannel {
   constructor(xi, yi, size, img, dNum, isBlank) {
      this.size = size;
      this.img = img;
      this.xi = xi;
      this.yi = yi;
      this.cxi = xi
      this.cyi = yi;
      this.dNum = dNum;
      this.isBlank = isBlank;
      this.targetxi = xi;
      this.targetyi = yi;
      this.moveCountMax = 10;
      this.moveCount = this.moveCountMax;
   };


   //Funktion und Bedingung zur der korrekte Stelle übeprüfen

   isCorrectPos() {
      if (this.cxi == this.xi && this.cyi == this.yi) return true;
      return false;
   };

   // moveCount und  moveCountMax vergleichen

   isMoving() {
      if (this.moveCount < this.moveCountMax) return true;
      else return false;
   };

   // Target ändern

   changeTarget(tarXi, tarYi) {
      this.targetxi = tarXi;
      this.targetyi = tarYi;
      this.moveCount = 0;
   };

   changeTargetImmidiate(tarXi, tarYi) {
      this.targetxi = tarXi;
      this.targetyi = tarYi;
      this.cxi = tarXi;
      this.cyi = tarYi;
   };

   // moveCount / moveCountMax aktualisieren

   update() {
      this.moveCount++;
      if (this.moveCount > this.moveCountMax) {
         this.cxi = this.targetxi;
         this.cyi = this.targetyi;
      };
   };



   // Pannel wird angezeigt
   // Pannel Variablen

   display(noFrame = false) {
      let countRatio = map(this.moveCount, 0, this.moveCountMax, 0, 1, true);
      countRatio = easingEaseInOutCubic(countRatio);
      let startx = this.cxi * this.size;
      let starty = this.cyi * this.size;
      let targetx = this.targetxi * this.size;
      let targety = this.targetyi * this.size;
      let x = startx + (targetx - startx) * countRatio;
      let y = starty + (targety - starty) * countRatio;
      let imgSize = min(this.img.width, this.img.height);
      let sx = this.img.width / 2 - imgSize / 2 + imgSize * (this.xi / this.dNum);
      let sy = this.img.height / 2 - imgSize / 2 + imgSize * (this.yi / this.dNum);
      let ss = imgSize / this.dNum;

      if (!this.isBlank || noFrame) {
         image(this.img, x, y, this.size, this.size, sx, sy, ss, ss);

         //das Gitter wird hier gezeichnet
         //Eigenschaften und Funktionen

         if (!noFrame) {
            noFill();
            stroke(197, 204, 193);
            strokeWeight(8);
            rect(x + 2.5, y + 2.5, this.size - 5, this.size - 5);
         };
      };
   };
};


//Übergang zwischen Klicks
// pow() = Erleichtert exponentielle Ausdrücke

function easingEaseInCubic(x) {
   return pow(x, 3);
};

function easingEaseOutCubic(x) {
   return pow(x - 1, 3) + 1;
};

function easingEaseInOutCubic(x) {
   if (x < 0.5) return 0.5 * pow(2 * x, 3);
   else return 0.5 * pow(2 * (x - 1), 3) + 1;
};