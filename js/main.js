/* fonction jouer */
const jouer = document.getElementById("boutonjouer");
const rejouerBtn = document.getElementById('rejouer');
const explication = document.getElementById("explication");
const cadreCowboy = document.getElementById("cadre_cowboy");
const cowboy = document.getElementById("cowboy");
let cowboyX = parseFloat(getComputedStyle(cowboy).left);
const topCowboy = (parseFloat(getComputedStyle(cowboy).bottom)) + (parseFloat(getComputedStyle(cowboy).height));
const diametreCowboy = parseFloat(getComputedStyle(cowboy).width); // Conversion en nombre du diametre du ballon
const xMin = 0; // Position gauche minimale
const xMaxCowboy = parseFloat(getComputedStyle(cadreCowboy).width);
const cadreJeu = document.getElementById("cadre_jeu");
const xMaxBandits = parseFloat(getComputedStyle(cadreJeu).width);
const bandits = document.getElementById("bandits");
let xBandits = "";
const vitesseBandits = 2; // Valeur du déplacement en pixels
const diametreBandits = parseFloat(getComputedStyle(bandits).width); // Conversion en nombre du diametre du bandit
let animationId = null; // Identifiant de l'animation
let direction = 1; // Sens de déplacement: 1 droite, 2 gauche
let yBandits = "";
let newYBandits = "";
const bullet = document.getElementById('bullet');
cadreJeu.removeChild(bullet);
const wantedList = document.getElementById("wantedlist");
const vitesseBullet = 4;
let score = document.getElementById("score");
score = 0;
let scoreMax = document.getElementById('scoremax');
scoreMax = 0;
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

//Ennemis
function genBandit() {
    var bandit = document.createElement("div");
    var stockNb = Math.floor(Math.random() * Math.floor(6));
    for (var i = 1; i <= 24; i++) {
        var bandit = document.createElement("div");
        var stockNb = Math.floor(Math.random() * Math.floor(6));

        //Bandit 1
        if (stockNb == 0) {
            bandit.style.backgroundImage = "url('images/bandit1.png')";

        }
        //Bandit 2
        else if (stockNb == 1) {
            bandit.style.backgroundImage = "url('images/bandit2.png')";

        }
        //Bandit 3
        else if (stockNb == 2) {
            bandit.style.backgroundImage = "url('images/bandit3.png')";

        }
        //Bandit 4
        else if (stockNb == 3) {
            bandit.style.backgroundImage = "url('images/bandit4.png')";

        }
        //Bandit 5
        else if (stockNb == 4) {
            bandit.style.backgroundImage = "url('images/bandit5.png')";

        }
        //Bandit 6
        else if (stockNb == 5) {
            bandit.style.backgroundImage = "url('images/bandit6.png')";

        }
        bandit.setAttribute("class", "bandit");
        bandit.id = 'bandit' + i;
        bandit.style.width = bandits.offsetWidth / 12 + "px";
        bandit.style.margin = bandits.offsetWidth / 64 + "px";
        bandit.style.display = "inline-block";

        bandits.appendChild(bandit);

    }
}
let banditArray = document.getElementsByClassName('bandit');

// D2place le bandit vers la gauche ou la droite
function animerBandits() {
    // Conversion en nombre de la position gauche du bloc
    xBandits = parseFloat(getComputedStyle(bandits).left);
    // Position basse du bloc
    yBandits = parseFloat(getComputedStyle(bandits).bottom);

    if (yBandits <= topCowboy) {
        return gameOver();
    }
    // Si le ballon arrive a un bord du cadre
    if (((xBandits + diametreBandits) >= xMaxBandits) || (xBandits < xMin)) {
        // On inverse le sens de déplacement
        direction *= -1;
        newYBandits = yBandits - 30;
    }
    // On descend le cadre
    bandits.style.bottom = newYBandits + "px";
    // Déplacement du bandit dans le sens actuel
    bandits.style.left = (xBandits + vitesseBandits * direction) + "px";
    // Demande au navigateur d'appeler animerBandit dès que possible
    animationId = requestAnimationFrame(animerBandits);
    // Collision des bandits avec le cowboy

}
// fonction changement bg
function changeBackground(bElement, bUrl) {
    return bElement.style.background = "url(" + bUrl + ")";
}


// Ajout de la fonction sur le bouton jouer
jouer.addEventListener("click", function() {
    jouer.style.display = "none"; // On enlève le bouton jouer
    explication.style.display = "none"; // On enlève le texte
    // On ajoute les bandits
    genBandit();
    wantedList.style.display = "none"; // On enleve les affiches wanted
    requestAnimationFrame(animerBandits); // On démarre l'animation des bandits
    changeBackground(document.body, "images/bg_scene_1.jpg");
})

rejouerBtn.addEventListener("click", function() {
    cadreJeu.appendChild(bandits);
    genBandit();
    rejouerBtn.style.display = "none";
    requestAnimationFrame(animerBandits);
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
    if ((event.keyCode == 38) || (event.keyCode == 32)) tir();
}

// Variables déplacement

// A GAUCHE
function gauche() {

    cowboyX -= 10;
    if (cowboyX <= xMin) {
        cowboyX = 0;
    };
    cowboy.style.left = cowboyX + "px";

}
//A DROITE
function droite() {

    cowboyX += 10;
    if ((cowboyX + diametreCowboy) >= xMaxCowboy) {
        cowboyX = xMaxCowboy - diametreCowboy;
    };
    cowboy.style.left = cowboyX + "px";

}



/*if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
    // collision détectée !
}*/

function bulletMve() {
    yBullet = parseFloat(getComputedStyle(bullet).bottom);
    newYBullet = (yBullet + vitesseBullet);
    let hauteurCadreJeu = cadreJeu.offsetHeight;
    /*if (collision) {

    } else {
        

    }*/
    bullet.style.bottom = (newYBullet + "px");
    requestAnimationFrame(bulletMve);
    if (newYBullet == hauteurCadreJeu) {
        cadreJeu.removeChild(myBullet);
        cancelAnimationFrame(bulletMve);
    }
}

function tir() {

    cadreJeu.appendChild(bullet);

    let topBullet = (parseFloat(getComputedStyle(cowboy).bottom)) + (parseFloat(getComputedStyle(cowboy).height));
    bullet.style.bottom = topBullet + "px";
    bullet.style.left = cowboyX + "px";
    let yBullet = "";
    let newYBullet = "";
    requestAnimationFrame(bulletMve);
    //Si il y a une collision
    let isCollapsed = function() {

        let coordBullet = bullet.getBoundingClientRect();
        let coordBandit = banditArray[i].getBoundingClientRect();
        for (var i = 1; i <= banditArray.length; i++) {

            if (coordBandit.left < coordBullet.left + coordBullet.width && coordBandit.left + coordBandit.width > coordBullet.left &&
                coordBandit.top < coordBullet.top + coordBullet.height && coordBandit.top + coordBandit.height > coordBullet.top) {
                if (bandit[i].className === 'bandit1') {
                    score += 100;
                } else if (bandit[i].className === 'bandit2') {
                    score += 400;
                } else if (bandit[i].className === 'bandit3') {
                    score += 250;
                } else if (bandit[i].className === 'bandit4') {
                    score += 750;
                } else if (bandit[i].className === 'bandit5') {
                    score += 500;
                } else if (bandit[i].className === 'bandit6') {
                    score += 1000;
                }
                bandits.removeChild(banditArray[i]);
                delete(banditArray[i]);
                cadreJeu.removeChild(bullet);
            }
        }

        //Tant que le bullet traverse l'écran 

        //Fin tir 

    }
}


function gameOver() {

    document.getElementById('game_over').style.display = "flex";
    changeBackground(document.body, "images/bg_scene_2.jpg");
    cancelAnimationFrame(animerBandits);
    bandits.style.top = "0px";
    bandits.innerHTML = "";
    cadreJeu.removeChild(bandits);
    if (score > scoreMax) {
        scoreMax = score;
    }
}

function win() {

    document.getElementById('win').style.display = "flex";
    changeBackground(document.body, "images/bg_scene_2.jpg");
    cancelAnimationFrame(animerBandits);
    cadreJeu.removeChild(bandits);

}

/*function bravo() {
    const bravoRejouer = document.getElementById(bravo_rejouer);
    bravoRejouer.style.display = "block";
    changeBackground(document.body, "images/bg_scene_2.jpg");
    cadreJeu.removeChild(bandits);
    rejouerBtn.style.display = none;
}*/