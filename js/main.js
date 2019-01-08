/* fonction jouer */
var jouer = document.getElementById("boutonjouer");
var zoneJeu = document.getElementById("zonejeu");
var bandit = document.getElementById("bandit");
zoneJeu.removeChild(bandit);
var explication = document.getElementById("explication");

jouer.addEventListener("click", function() {
zoneJeu.removeChild(jouer);
zoneJeu.removeChild(explication);
zoneJeu.appendChild(bandit); 
})


const cadreCowboy = document.getElementById("cadre_cowboy");
const cowboy = document.getElementById("cowboy");
let cowboyX = "";
const diametreCowboy = parseFloat(getComputedStyle(cowboy).width); // Conversion en nombre du diametre du ballon
const xMin = 0; // Position gauche minimale
const xMaxCowboy = parseFloat(getComputedStyle(cadreCowboy).width);
const ennemis = document.getElementById('ennemis');
const ennemi1 = document.getElementById('ennemi_1');

/*var cadre = document.getElementById("cadre");
var bandit = document.getElementById("bandit");
var vitesse = 3; // Valeur du déplacement en pixels
var diametreBandit = parseFloat(getComputedStyle(bandit).width); // Conversion en nombre du diametre du bandit
var animationId = null; // Identifiant de l'animation
var xMin = 0; // Position gauche minimale
var direction = 1; // Sens de déplacement: 1 droite, 2 gauche

// D2place le ballon vers la gauche ou la droite
function animerEnnemis() {
    // Conversion en nombre de la position gauche du bloc
    var xBallon = parseFloat(getComputedStyle(ballon).left);
    var yBallon = parseFloat(getComputedStyle(ballon).bottom);
    var newYBallon = "";
    // D2place le bandit vers la gauche ou la droite
    function animerBandit() {
        // Conversion en nombre de la position gauche du bloc
        var xBandit = parseFloat(getComputedStyle(bandit).left);
        // Conversion en nombre de la largeur du cadre
        var xMax = parseFloat(getComputedStyle(cadre).width);
        // Si le ballon arrive a un bord du cadre
        if ((xBandit + diametreBandit > xMax) || (xBandit < xMin)) {
            // On inverse le sens de déplacement
            direction *= -1;
            var newYBallon = yBallon - 10;
        }
        ballon.style.bottom = newYBallon + "px";
        // Déplacement du ballon dans le sens actuel
        ballon.style.left = (xBallon + vitesse * direction) + "px";
        // Demande au navigateur d'appeler animerBallon dès que possible
        animationId = requestAnimationFrame(animerEnnemis);
        // Déplacement du bandit dans le sens actuel
        bandit.style.left = (xBandit + vitesse * direction) + "px";
        // Demande au navigateur d'appeler animerBandit dès que possible
        animationId = requestAnimationFrame(animerBandit);
    }
};

var jouerBtn = document.getElementById("jouer");
//var arreterBtn = document.getElementById("arreter");

demarrerBtn.addEventListener("click", function () {
    // Change l'état des boutons
    jouerBtn.disabled = true;
    //arreterBtn.disabled = false;
    // Démarre l'animation
    requestAnimationFrame(animerBandit);
});

arreterBtn.addEventListener("click", function () {
    demarrerBtn.disabled = false;
    arreterBtn.disabled = true;
    arreterBtn.addEventListener("click", function () {
        jouerBtn.disabled = false;
        //arreterBtn.disabled = true;
        cancelAnimationFrame(animationId);

    });
});*/

// Fonction deplacement cowboy
document.onkeydown = function(event) {
    if (event.keyCode == 37) gauche();
    if (event.keyCode == 39) droite();
    if (event.keyCode == 32) tir();
}

// Variables déplacement

// A GAUCHE
function gauche() {
    cowboyX = getComputedStyle(cowboy).left;
    cowboyX = parseInt(cowboyX) - 10;
    if (cowboyX <= xMin) {
        cowboyX = 0;
    };
    cowboy.style.left = cowboyX + "px";
}
//A DROITE
function droite() {
    cowboyX = getComputedStyle(cowboy).left;
    cowboyX = parseInt(cowboyX) + 10;
    if ((cowboyX + diametreCowboy) >= xMaxCowboy) {
        cowboyX = xMaxCowboy - diametreCowboy;
    };
    cowboy.style.left = cowboyX + "px";
}