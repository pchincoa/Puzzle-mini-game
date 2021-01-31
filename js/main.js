// Globale Variablen


let url = [
   "https://media.giphy.com/media/3ohhwDfcBvBPpD9RZu/source.gif", // Vermeer
   "https://media.giphy.com/media/gVJKzDaWKSETu/source.gif", // Frida Kahlo
   "https://media.giphy.com/media/xTiTnyVHRS87mtGPQs/source.gif", // Magritte
   "https://media.giphy.com/media/l4tV5VQbNScIikY4o/source.gif", // Picasso
   "https://media.giphy.com/media/pJewxDQLE8iZi/source.gif" // Leonardo
];

let img;
let sound;
let puzz;
let counter = 0;
let button1, button2;
const mischenZeit = 10;


// Array-Bildern initialisieren und laden


function preload() {
   img = loadImage(url[Math.floor(random(url.length))]);

}

// Puzzlebildern werden in Canvas geladen

function setup() {
   createCanvas(windowWidth, windowHeight);
   button1 = createButton('Reload the Puzzle');
   button1.mousePressed(nachLaden);


  




};

// Puzzlebildern werden in Canvas geladen
// Bg Farbe, Stellung der Bilder und Frame Funktionen,

function draw() {
   img.setFrame(frameCount % img.numFrames());
   frameRate(5);
   background(197, 204, 193);
   image(img, width / 3, height / 8, 700, 750);


};


// Die Seite nachladen
function nachLaden() {
   button1 = window.location.reload();

}

// Größe des Fensters ändern

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}


