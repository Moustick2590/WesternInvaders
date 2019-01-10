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
const vitesseBandit = 5; // Valeur du déplacement en pixels
const diametreBandit = parseFloat(getComputedStyle(bandit).width); // Conversion en nombre du diametre du bandit
let animationId = null; // Identifiant de l'animation
let direction = 1; // Sens de déplacement: 1 droite, 2 gauche
let yBandit = "";
let newYBandit = "";
cadreEnnemis.removeChild(bandit);
const wantedList = document.getElementById("wantedlist");
const vitesseBullet = 7;

// defilement du texte
/*function machineEcrire() {
    document.getElementById('explication').innerHTML = message.substr(0, cour) + "<span id='test'>" + message.charAt(cour) + "</span>";
    if (cour == message.length)
        clearInterval(animation);
    else
        cour++;
}
message = "Bienvenue au Far West ! Le shérif est mort, vous êtes notre unique espoir de sauver notre ville de l'attaque des bandits. Pour cela, tirez avec la touche 'espace' et déplacez vous avec les flèches directionnelles 'gauche' et 'droite'.";
cour = 0;
animation = setInterval("machineEcrire()", 50);*/

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
    bandit.style.left = (xBandit + vitesseBandit * direction) + "px";
    // Demande au navigateur d'appeler animerBandit dès que possible
    animationId = requestAnimationFrame(animerBandit);
    

}
// fonction changement bg
function changeBackground(bElement, bUrl) {
    return bElement.style.backgroundImage = "url(" + bUrl + ")", "cover", "no-repeat", "center";
}

// Ajout de la fonction sur le bouton jouer
jouer.addEventListener("click", function() {
    cadreEnnemis.removeChild(jouer); // On enlève le bouton jouer
    cadreEnnemis.removeChild(explication); // On enlève le texte
    cadreEnnemis.appendChild(bandit); // On ajoute les bandits
    cadreEnnemis.removeChild(wantedList); // On enleve les affiches wanted
    requestAnimationFrame(animerBandit); // On démarre l'animation des bandits
    changeBackground(document.body, "images/bg_scene_1.jpg");
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
    if (event.keyCode == 38) tir();
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
    bullet.style.left = cowboyX + "px";
}
//A DROITE
function droite() {
    cowboyX = getComputedStyle(cowboy).left;
    cowboyX = parseInt(cowboyX) + 10;
    if ((cowboyX + diametreCowboy) >= xMaxCowboy) {
        cowboyX = xMaxCowboy - diametreCowboy;
    };
    cowboy.style.left = cowboyX + "px";
    bullet.style.left = cowboyX + "px";
}

// Collision des bandits avec le cowboy

/*if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
    // collision détectée !
}*/

//Debut tir 






function tir() {
    let myBullet = new Image();
    myBullet.src = 'images/bullet.png';
    myBullet.setAttribute("id", "bullet");
    cadreEnnemis.appendChild(myBullet);
    const bullet = document.getElementById('bullet');
    let topBullet = (parseFloat(getComputedStyle(cowboy).bottom)) + (parseFloat(getComputedStyle(cowboy).height));
    bullet.style.bottom = topBullet + "px";

    let yBullet = "";
    let newYBullet = "";
    //Si il y a une collision
    function bulletMve() {
        yBullet = parseFloat(getComputedStyle(bullet).bottom);
        newYBullet = (yBullet + vitesseBullet);

        /*if (collision) {

        } else {
            

        }*/
        bullet.style.bottom = (newYBullet + "px");
        requestAnimationFrame(bulletMve);
    }
    requestAnimationFrame(bulletMve);
    //Tant que le bullet traverse l'écran 
    /*while (parseInt(bullet.style.bottom) > yMax) {
        
    }*/
}
//Fin tir