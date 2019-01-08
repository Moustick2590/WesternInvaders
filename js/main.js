const cadreCowboy = document.getElementById("cadre_cowboy");
const cowboy = document.getElementById("cowboy");
let cowboyX = "";
const diametreCowboy = parseFloat(getComputedStyle(cowboy).width); // Conversion en nombre du diametre du ballon
const xMin = 0; // Position gauche minimale
const xMaxCowboy = parseFloat(getComputedStyle(cadreCowboy).width);
const jouerBtn = document.getElementById("jouer");
const cadreEnnemis = document.getElementById("cadre_ennemis");

const bandit = document.getElementById("bandit");
const vitesse = 8; // Valeur du déplacement en pixels
const diametreBandit = parseFloat(getComputedStyle(bandit).width); // Conversion en nombre du diametre du bandit
let animationId = null; // Identifiant de l'animation
let direction = 1; // Sens de déplacement: 1 droite, 2 gauche

const presentation = document.getElementById('presentation');
let newYBandit = "";
cadreEnnemis.removeChild(bandit);

// D2place le bandit vers la gauche ou la droite
function animerBandit() {
    // Conversion en nombre de la position gauche du bloc
    let xBandit = parseFloat(getComputedStyle(bandit).left);
    // Position basse du bloc
    let yBandit = parseFloat(getComputedStyle(bandit).bottom);

    const xMaxBandit = parseFloat(getComputedStyle(cadreEnnemis).width);
    // Si le ballon arrive a un bord du cadre
    if ((xBandit + diametreBandit > xMaxBandit) || (xBandit < xMin)) {
        // On inverse le sens de déplacement
        direction *= -1;
        newYBandit = yBandit - 50;
    }
    // On descend le cadre
    bandit.style.bottom = newYBandit + "px";
    // Déplacement du bandit dans le sens actuel
    bandit.style.left = (xBandit + vitesse * direction) + "px";
    // Demande au navigateur d'appeler animerBandit dès que possible
    animationId = requestAnimationFrame(animerBandit);

}


jouerBtn.addEventListener("click", function() {
    // Change l'état des boutons
    cadreEnnemis.removeChild(presentation);
    cadreEnnemis.appendChild(bandit);
    //arreterBtn.disabled = false;
    // Démarre l'animation
    requestAnimationFrame(animerBandit);
})


/*arreterBtn.addEventListener("click", function() {
    demarrerBtn.disabled = false;
    arreterBtn.disabled = true;
    arreterBtn.addEventListener("click", function() {
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