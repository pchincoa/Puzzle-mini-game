// Globale Variablen

let arr = [
   "https://media.giphy.com/media/xT0xesOvAnyiyPMjbq/source.gif", // Egon Schiele
   "https://media.giphy.com/media/gVJKzDaWKSETu/source.gif", // Frida Kahlo
   "https://media.giphy.com/media/xTiTnyVHRS87mtGPQs/source.gif", //  René Magritte
   "https://media.giphy.com/media/l4tV5VQbNScIikY4o/source.gif", //  Pablo Picasso
   "https://media.giphy.com/media/pJewxDQLE8iZi/source.gif", // Leonardo da Vinci
   "https://media.giphy.com/media/495Ifoc3oyEtwikNLx/source.gif", // Albrecht Dürer 
];

let img;
let confetti = [];
let song;
let p;
let counter = 0;
let reload;
let remove;
let level1, level2;
let slider;
let mischenZeit = 90;

// Array-Bildern, song initialisieren und laden

function preload() {
   img = loadImage(arr[Math.floor(random(arr.length))]);
   song = loadSound("sound/Oh-by-jingo.mp3");
};

//#######################

// Puzzlebildern werden in Canvas geladen

function setup() {

   // Canvas Abmesungen
   createCanvas(windowWidth, windowHeight);
   frameRate(24);

   song.play();
   slider = createSlider(0, 1, 0, 0.01);


   // level 1
   let lx1 = 0;
   let ly1 = 347.5;
   level1 = createButton('Level 1');
   level1.position(lx1, ly1);
   level1.mousePressed(levels);

   //level2
   let lx2 = 100;
   let ly2 = 347.5;
   level2 = createButton('Level 2');
   level2.position(lx2, ly2);
   level2.mousePressed(levels);

   // Puzzle lösen
   let rx = 0;
   let ry = 450;
   reload = createButton('Solution');
   reload.position(rx, ry);
   reload.mousePressed(pSolution);

   // #id auswählen und einstellen

   let timer = select('#timer');
   timer.html(convertSeconds(counter));
   remove = setInterval(timeIt, 1000);

   // Settings Timer

   function timeIt() {
      counter++;
      timer.html(convertSeconds(counter));
   }
   // Confetti Piece Instance
   // nach dem Lösung des Puzzle Confetti zeigen

   for (let i = 0; i < 800; i++) {
      confetti[i] = new Confetti();

   }; // Ende Schleife

   // Puzzle Objekt hier
   p = new Puzzle(img, 4, min(width / 1.2, height / 1.2) * 0.85);
   img.pause();


}; //ENDE setup
//#######################

// Puzzlebildern werden in Canvas geladen
// Bg Farbe, Stellung der Bilder und Frame Funktionen

function draw() {
   img.setFrame(frameCount % img.numFrames());
   song.setVolume(slider.value());

   background('#c5ccc1');
   let success = false;

   // Condition / Bedingung für Bildern/Schuffle/Mischung

   if (frameCount < mischenZeit && frameCount > mischenZeit / 10) {
      for (let i = 0; i < 3; i++) p.shuffle();


   };
   //Bedingung Bildern und Puzzle Lösung
   if (frameCount > mischenZeit && p.isCorrect()) {

      //Stop Counter hier
      clearInterval(remove);
      // Confetti Schleife
      for (let i = 0; i < 800; i++) {
         confetti[i].show();
         confetti[i].updateConfetti();

      }; // Ende Schleife Confetti

      success = true;

   }; //Ende success condition

   // condition level 1

   p.update();
   p.display(success);

}; //ENDE Draw

//#######################

// Mouse cliked Funktion

function mouseClicked() {
   if (frameCount > mischenZeit) p.click(mouseX, mouseY);
}

// Sekunden in "zweistellig" konvertieren

function convertSeconds(s) {
   let min = floor(s / 60);
   let sec = s % 60;
   return nf(min, 2) + ':' + nf(sec, 2);

};

// nachladen und level 1, 2
function levels() {
   level1,
   level2 = window.location.reload();
}

// Puzzle und Confetti anzeigen
function pSolution() {
   p = new Puzzle(img, 5, min(width / 1.2, height / 1.2) * 0.85);

};


// Größe des Fensters ändern

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
};
