// ========= PAS HIER DE INSTELLINGEN AAN =========

// Hoe "ingezoomd" het patroon is.
let ruisSchaal = 0.003;

// Het aantal hoogtelijnen.
let aantalLijnen = 10;

// De "dikte" van de lijnen.
let lijnDikte = 0.009;

// Hoe snel het patroon beweegt. Kleinere waarde = langzamer.
let animatieSnelheid = 0.002;

// Performance: resolutie van de pixels. Hoger = sneller maar minder detail.
let resolutie = 1.8;

// Dit is onze 'tijd'-variabele voor de animatie.
let zOffset = 0;

// ===============================================

// Variabele voor de container waar de sketch in moet komen.
let canvasContainer;

function setup() {
    // Vind de container div in de HTML
    canvasContainer = select('#p5-hero-background');
    
    // Maak het canvas aan met de afmetingen van de container
    // en koppel het eraan met .parent()
    const canvas = createCanvas(canvasContainer.width, canvasContainer.height);
    canvas.parent('p5-hero-background');

   // Nieuwe regel voor wit met transparantie
fill(255, 80); // De '80' staat voor de transparantie (0=onzichtbaar, 255=volledig zichtbaar)
    noStroke();
    
    // Optioneel: noiseSeed() voor een vast startpatroon bij elke refresh.
    // noiseSeed(99);
}

function draw() {
    // Maak de achtergrond elke frame opnieuw zwart
    background(0);

    // Loop door het canvas met grotere stappen (de resolutie)
    for (let x = 0; x < width; x += resolutie) {
        for (let y = 0; y < height; y += resolutie) {
            
            // Bereken de ruis-waarde, met de 'zOffset' voor de 3e dimensie (tijd)
            let ruisWaarde = noise(x * ruisSchaal, y * ruisSchaal, zOffset);

            // Controleer voor elke hoogtelijn of dit punt getekend moet worden
            for (let i = 1; i <= aantalLijnen; i++) {
                let drempel = i / aantalLijnen;
                if (abs(ruisWaarde - drempel) < lijnDikte / 2) {
                    // Teken een klein vierkantje i.p.v. een punt.
                    rect(x, y, resolutie, resolutie);
                    break;
                }
            }
        }
    }

    // Verhoog de tijd-variabele voor het volgende frame, zodat het patroon beweegt.
    zOffset += animatieSnelheid;
}

// Als het venster wordt geschaald, pas de grootte van het canvas aan.
function windowResized() {
    // Pas de grootte van het canvas aan naar de nieuwe grootte van de container.
    resizeCanvas(canvasContainer.width, canvasContainer.height);
}