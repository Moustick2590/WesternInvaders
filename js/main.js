/* fonction jouer */
const jouer = document.getElementById("boutonjouer");
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
const vitesseBandits = 3; // Valeur du déplacement en pixels
const diametreBandits = parseFloat(getComputedStyle(bandits).width); // Conversion en nombre du diametre du bandit
let animationId = null; // Identifiant de l'animation
let direction = 1; // Sens de déplacement: 1 droite, 2 gauche
let yBandits = "";
let newYBandits = "";
cadreJeu.removeChild(bandits);
const wantedList = document.getElementById("wantedlist");
const vitesseBullet = 4;

// defilement du texte
function machineEcrire() {
    document.getElementById('explication').innerHTML = message.substr(0, cour) + "<span id='test'>" + message.charAt(cour) + "</span>";
    if (cour == message.length)
        clearInterval(animation);
    else
        cour++;
}
message = "Bienvenue au Far West ! Le shérif est mort, vous êtes notre unique espoir de sauver notre ville de l'attaque des bandits. Pour cela, tirez avec la touche 'espace' et déplacez vous avec les flèches directionnelles 'gauche' et 'droite'.";
cour = 0;
animation = setInterval("machineEcrire()", 50);

//Ennemis
function genBandit() {
    for (var i = 1; i <= 24; i++) {
        var bandit = document.createElement("div");
        var stockNb = Math.floor(Math.random() * Math.floor(6));

        //Bandit 1
        if (stockNb = 0) {
            bandit.style.backgroundImage = "url('imgages/bandit1.png')";
            bandit.style.backgroundSize = "cover";
        }
        //Bandit 2
        else if (stockNb = 1) {
            bandit.style.backgroundImage = "url('imgages/bandit2.png')";
            bandit.style.backgroundSize = "cover";
        }
        //Bandit 3
        else if (stockNb = 2) {
            bandit.style.backgroundImage = "url('imgages/bandit3.png')";
            bandit.style.backgroundSize = "cover";
        }
        //Bandit 4
        else if (stockNb = 3) {
            bandit.style.backgroundImage = "url('imgages/bandit4.png')";
            bandit.style.backgroundSize = "cover";
        }
        //Bandit 5
        else if (stockNb = 4) {
            bandit.style.backgroundImage = "url('imgages/bandit5.png')";
            bandit.style.backgroundSize = "cover";
        }
        //Bandit 6
        else if (stockNb = 5) {
            bandit.style.backgroundImage = "url('imgages/bandit6.png')";
            bandit.style.backgroundSize = "cover";
        }
        bandit.setAttribute("class", "bandit");
        bandit.setAttribute("id", "bandit" + i);
        bandit.style.display = "inline-block";

        document.getElementById("bandits").appendChild(bandit);

    }
}

// D2place le bandit vers la gauche ou la droite
function animerBandits() {
    // Conversion en nombre de la position gauche du bloc
    xBandits = parseFloat(getComputedStyle(bandits).left);
    // Position basse du bloc
    yBandits = parseFloat(getComputedStyle(bandits).bottom);

    if (yBandits <= topCowboy) {
        let btnRejouer = document.createElement('button');
        cadreJeu.removeChild(bandits);
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

    cadreJeu.appendChild(bandits); // On ajoute les bandits
    genBandit();
    wantedList.style.display = "none"; // On enleve les affiches wanted
    requestAnimationFrame(animerBandits); // On démarre l'animation des bandits
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

    /*if (collision) {

    } else {
        

    }*/
    bullet.style.bottom = (newYBullet + "px");
    requestAnimationFrame(bulletMve);
}

function tir() {
    let myBullet = new Image();
    myBullet.src = 'images/bullet.png';
    myBullet.setAttribute("id", "bullet");
    cadreJeu.appendChild(myBullet);
    const bullet = document.getElementById('bullet');
    let topBullet = (parseFloat(getComputedStyle(cowboy).bottom)) + (parseFloat(getComputedStyle(cowboy).height));
    bullet.style.bottom = topBullet + "px";
    bullet.style.left = cowboyX + "px";
    let yBullet = "";
    let newYBullet = "";
    requestAnimationFrame(bulletMve);
    //Si il y a une collision


    //Tant que le bullet traverse l'écran 

    //Fin tir 

}

function gameOver() {
    const rejouerBtn = document.getElementById(rejouer);
    rejouerBtn.style.display = "block";
    changeBackground(document.body, "images/bg_scene_2.jpg");
    cadreJeu.removeChild(bandits);
    const rejouerBtn = document.getElementById(rejouer);
    rejouerBtn.style.display = "block";
    changeBackground(document.body, "images/bg_scene_2.jpg");
}