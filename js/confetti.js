// Confetti Objekt

class Confetti {

   constructor() {

      //Stellung und Farben

      this.x = random(0, width);
      this.y = random(0, -height);
      this.r = random(255);
      this.g = random(10, 200);
      this.b = random(20, 255);

      // die gezeichnete Form zeigen

      this.show = function () {
         noStroke();
         fill(this.r, this.g, this.b);
         rect(this.x, this.y, 7.5, 7.5);

      };

      // die Konfettischleife aktualisieren

      this.updateConfetti = function () {
         this.speed = random(2, 40);
         this.y = this.y + this.speed;

         // Kontrollstruktur der Update-Funktion
         if (this.y > height) {
            this.y = random(0, -height);
         };
      };

   };

};