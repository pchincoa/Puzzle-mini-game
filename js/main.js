// Globale Variablen


let url = [
   "https://media.giphy.com/media/3ohhwDfcBvBPpD9RZu/source.gif", // Vermeer
   "https://media.giphy.com/media/gVJKzDaWKSETu/source.gif", // Frida Kahlo
   "https://media.giphy.com/media/xTiTnyVHRS87mtGPQs/source.gif", // Magritte
   "https://media.giphy.com/media/l4tV5VQbNScIikY4o/source.gif", // Picasso
   "https://media.giphy.com/media/pJewxDQLE8iZi/source.gif" // Leonardo
];

let img;
let confetti = [];
let song;
let slider;
let puzz;
let counter = 0;
let button1, button2;
const mischenZeit = 10;


// Array-Bildern initialisieren und laden
// Song initialisieren und laden


function preload() {
   img = loadImage(url[Math.floor(random(url.length))]);
   song = loadSound('sound/Oh-by-jingo.mp3');

};



// Puzzlebildern werden in Canvas geladen

function setup() {
   createCanvas(windowWidth, windowHeight);
   button1 = createButton('Reload the Puzzle');
   button1.mousePressed(nachLaden);
   song.play();
   slider = createSlider(0,1,0,0.01);



   // Id auswählen und einstellen

   let timer = select('#timer');
   timer.html(convertSeconds(counter));
   setInterval(timeIt, 800)

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



}; //ENDE setup

// Puzzlebildern werden in Canvas geladen
// Bg Farbe, Stellung der Bilder und Frame Funktionen,

function draw() {
   img.setFrame(frameCount % img.numFrames());
   frameRate(8);
   song.setVolume(slider.value());
   background(197, 204, 193);
   image(img, width / 3, height / 8, 700, 750);
   // Confetti Schleife
   for (let i = 0; i < 500; i++) {
      //confetti[i].show();
      confetti[i].updateConfetti();

   }; // Ende Schleife





}; //ENDE draw


// Sekunden in "zweistellig" konvertieren

function convertSeconds(s) {
   let min = floor(s / 60);
   let sec = s % 60;
   return nf(min, 2) + ':' + nf(sec, 2);

};


// Die Seite nachladen
function nachLaden() {
   button1 = window.location.reload();

};

// Größe des Fensters ändern

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
};