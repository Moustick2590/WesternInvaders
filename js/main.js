/* fonction jouer */
const jouer = document.getElementById("boutonjouer");
const explication = document.getElementById("explication");
const cadreCowboy = document.getElementById("cadre_cowboy");
const cowboy = document.getElementById("cowboy");
let cowboyX = "";
const topCowboy = (parseFloat(getComputedStyle(cowboy).bottom)) + (parseFloat(getComputedStyle(cowboy).height));
const diametreCowboy = parseFloat(getComputedStyle(cowboy).width); // Conversion en nombre du diametre du ballon
const xMin = 0; // Position gauche minimale
const xMaxCowboy = parseFloat(getComputedStyle(cadreCowboy).width);
const cadreEnnemis = document.getElementById("cadre_ennemis");
const xMaxBandit = parseFloat(getComputedStyle(cadreEnnemis).width);
const bandit = document.getElementById("bandit");
let xBandit = "";
const vitesse = 5; // Valeur du déplacement en pixels
const diametreBandit = parseFloat(getComputedStyle(bandit).width); // Conversion en nombre du diametre du bandit
let animationId = null; // Identifiant de l'animation
let direction = 1; // Sens de déplacement: 1 droite, 2 gauche
let yBandit = "";
const presentation = document.getElementById('presentation');
let newYBandit = "";
cadreEnnemis.removeChild(bandit);

// D2place le bandit vers la gauche ou la droite
function animerBandit() {
    // Conversion en nombre de la position gauche du bloc
    xBandit = parseFloat(getComputedStyle(bandit).left);
    // Position basse du bloc
    yBandit = parseFloat(getComputedStyle(bandit).bottom);

    
    // Si le ballon arrive a un bord du cadre
    if (((xBandit + diametreBandit) >= xMaxBandit) || (xBandit < xMin)) {
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

// Ajout de la fonction sur le bouton jouer
jouer.addEventListener("click", function() {
    cadreEnnemis.removeChild(jouer); // On enlève le bouton jouer
    cadreEnnemis.removeChild(explication); // On enlève le texte
    cadreEnnemis.appendChild(bandit); // On ajoute les bandits
    requestAnimationFrame(animerBandit); // On démarre l'animation des bandits
})

if (yBandit <= topCowboy) {
    cancelAnimationFrame(animerBandit);

}
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

// Collision des bandits avec le cowboy

/*if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
    // collision détectée !
}*/

//Debut tir 
 function Bullet (width, height, x, y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
}

function tir (){
   var bullet = new Bullet("10px", "10px", cowboy.style.);
 
}
//Fin tir 