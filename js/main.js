var cadre = document.getElementById("cadre");
var bandit = document.getElementById("bandit");
var vitesse = 3; // Valeur du déplacement en pixels
var diametreBandit = parseFloat(getComputedStyle(bandit).width); // Conversion en nombre du diametre du bandit
var animationId = null; // Identifiant de l'animation
var xMin = 0; // Position gauche minimale
var direction = 1; // Sens de déplacement: 1 droite, 2 gauche

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
    }
    // Déplacement du bandit dans le sens actuel
    bandit.style.left = (xBandit + vitesse * direction) + "px";
    // Demande au navigateur d'appeler animerBandit dès que possible
    animationId = requestAnimationFrame(animerBandit);
}

var jouerBtn = document.getElementById("jouer");
//var arreterBtn = document.getElementById("arreter");

demarrerBtn.addEventListener("click", function () {
    // Change l'état des boutons
    jouerBtn.disabled = true;
    //arreterBtn.disabled = false;
    // Démarre l'animation
    requestAnimationFrame(animerBandit);
});

/*arreterBtn.addEventListener("click", function () {
    jouerBtn.disabled = false;
    //arreterBtn.disabled = true;
    cancelAnimationFrame(animationId);

});*/


// Fonction deplacement cowboy
    document.onkeydown = function(event) {
        if (event.keyCode == 37) gauche();
        if (event.keyCode == 39) droite();
    }
    
    // Variables déplacement
    let cowboyX;
    // A GAUCHE
    function gauche() {
        cowboyX = getComputedStyle(cowBoy).left;
        cowboyX = parseInt(cowboyX) - 20;
        cowboyX = cowboyX + "%";
        cowBoy.style.left = cowboyX;
    }
    //A DROITE
    function droite() { x = getComputedStyle(cowBoy).left;
        cowboyX = getComputedStyle(cowBoy).left;
        cowboyX = parseInt(cowboyX) + 20;
        cowboyX = cowboyX + "%";
        cowBoy.style.left = cowboyX;
                      }
