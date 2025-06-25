// ========= footer-sketch.js =========

const footerSketch = (p) => {

    // Instellingen voor de footer-animatie (je kunt deze anders maken dan de hero!)
    let ruisSchaal = 0.004;
    let aantalLijnen = 8;
    let lijnDikte = 0.01;
    let animatieSnelheid = 0.0015;
    let resolutie = 2.0;
    let zOffset = 1000; // Start met een andere offset dan de hero voor een ander patroon

    let canvasContainer;

    p.setup = () => {
        canvasContainer = p.select('#footer-p5-background');
        const canvas = p.createCanvas(canvasContainer.width, canvasContainer.height);
        
        // Belangrijk: .parent() is niet nodig omdat we de container al meegeven bij het aanmaken.
        
        p.fill(255, 80); // Wit met transparantie
        p.noStroke();
    };

    p.draw = () => {
        p.background(0); // Gebruik p.background in instance mode

        for (let x = 0; x < p.width; x += resolutie) {
            for (let y = 0; y < p.height; y += resolutie) {
                
                let ruisWaarde = p.noise(x * ruisSchaal, y * ruisSchaal, zOffset);

                for (let i = 1; i <= aantalLijnen; i++) {
                    let drempel = i / aantalLijnen;
                    if (p.abs(ruisWaarde - drempel) < lijnDikte / 2) {
                        p.rect(x, y, resolutie, resolutie);
                        break;
                    }
                }
            }
        }
        zOffset += animatieSnelheid;
    };

    p.windowResized = () => {
        p.resizeCanvas(canvasContainer.width, canvasContainer.height);
    };
};

// Start de sketch en koppel hem aan de 'footer-p5-background' div
new p5(footerSketch, 'footer-p5-background');