// Puzzle Objekt

class Puzzle {
   constructor(img, dNum, size) {
      this.size = size;
      this.dNum = dNum;
      this.panels = [];
      for (let yi = 0; yi < dNum; yi++) {
         for (let xi = 0; xi < dNum; xi++) {
            let isBlank = xi == dNum - 1 && yi == dNum - 1 ? true : false;

            //das Panel in die "nested" Schleife hinzufügen
            this.panels.push(new Pannel(xi, yi, size / dNum, img, dNum, isBlank));
         };
      };
   };

   // Schleife for...of und const sintax

   update() {
      for (const p of this.panels) p.update();
   };

   display(noFrame = false) {
      push();
      translate(width / 2 - this.size / 2, height / 2 - this.size / 2);
      for (const p of this.panels) p.display(noFrame);
      pop();
   };


   getIndexfromPos(xpos, ypos) {
      const x = xpos - width / 2 + this.size / 2;
      const y = ypos - height / 2 + this.size / 2;
      if (x >= 0 && x < this.size && y >= 0 && y < this.size) {
         const xi = Math.floor(map(x, 0, this.size, 0, this.dNum));
         const yi = Math.floor(map(y, 0, this.size, 0, this.dNum));
         return createVector(xi, yi);
      } else return false;
   };

   getPanelFromIndex(xi, yi) {
      for (const p of this.panels) {
         if (p.cxi == xi && p.cyi == yi) return p;
      };
      return false;
   };

   // Bewegung und Richtungen der Panels
   
   checkMovable(xi, yi) {
      for (const p of this.panels)
         if (p.isMoving() == true) return false;

      let aroundPanels = [];
      aroundPanels.push(this.getPanelFromIndex(xi - 1, yi)); //left
      aroundPanels.push(this.getPanelFromIndex(xi, yi - 1)); //up
      aroundPanels.push(this.getPanelFromIndex(xi + 1, yi)); //right
      aroundPanels.push(this.getPanelFromIndex(xi, yi + 1)); //down
      let movable = false;
      for (let i = 0; i < aroundPanels.length; i++) {
         if (aroundPanels[i] != false) {
            if (aroundPanels[i].isBlank) movable = createVector(aroundPanels[i].cxi, aroundPanels[i].cyi);
         };
      };
      return movable;
   };

   swapPanel(axi, ayi, bxi, byi, immidiate = false) {
      const aPanel = this.getPanelFromIndex(axi, ayi);
      const bPanel = this.getPanelFromIndex(bxi, byi);

      if (immidiate) {
         aPanel.changeTargetImmidiate(bxi, byi);
         bPanel.changeTargetImmidiate(axi, ayi);

      } else {
         aPanel.changeTarget(bxi, byi);
         bPanel.changeTarget(axi, ayi);
      };
   };

   // Click Funktion // Index und Position

   click(x, y) {
      const clickIndex = this.getIndexfromPos(x, y);
      const targetIndex = this.checkMovable(clickIndex.x, clickIndex.y);
      let success = false;
      if (targetIndex != false) {
         this.swapPanel(clickIndex.x, clickIndex.y, targetIndex.x, targetIndex.y, false);
         success = true;
      };
      return success;
   };

   // Shuffle // Mischung Algorithtmus

   shuffle() {
      const clickIndex = createVector(Math.floor(random(this.dNum)), Math.floor(random(this.dNum)));
      const targetIndex = this.checkMovable(clickIndex.x, clickIndex.y);
      let success = false;
      if (targetIndex != false) {
         this.swapPanel(clickIndex.x, clickIndex.y, targetIndex.x, targetIndex.y, true);
         success = true;
      };
      return success;
   };

   // wenn die Position ist richtig // Funktion wird in draw() angelegt.
   isCorrect() {
      for (const p of this.panels)
         if (p.isCorrectPos() == false) return false;
      return true;
   };

};