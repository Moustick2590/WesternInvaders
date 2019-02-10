const rejouerWin = document.getElementById('rejouerwin');
const rejouerLose = document.getElementById('rejouerloose');

const cadreCowboy = document.getElementById("cadre_cowboy");
const cowboy = document.getElementById("cowboy");
let cowboyX = parseFloat(getComputedStyle(cowboy).left);
const topCowboy = (parseFloat(getComputedStyle(cowboy).bottom)) + (parseFloat(getComputedStyle(cowboy).height));
const diametreCowboy = parseFloat(getComputedStyle(cowboy).width); // Conversion en nombre du diametre du ballon
const xMin = 0; // Position gauche minimale
const xMaxCowboy = parseFloat(getComputedStyle(cadreCowboy).width);
const cadreJeu = document.getElementById("cadre_jeu");
const xMaxBandits = parseFloat(getComputedStyle(cadreJeu).width);
const vitesseBandits = 2; // Valeur du déplacement en pixels
let animationId = null; // Identifiant de l'animation
let direction = 1; // Sens de déplacement: 1 droite, 2 gauche
const wantedList = document.getElementById("wantedlist");
const vitesseBullet = 4;
let score = document.getElementById("score");
let scoreMax = document.getElementById('scoremax');
let pointsPartie = document.getElementById('amount');
let meilleurScore;

/* fonction jouer */
function jeu() {
    // On enlève les div de présenatation
    document.getElementById('game_over').style.display = "none";
    document.getElementById('win').style.display = "none";
    //On change le fond d'écran et on initialise le score
    changeBackground(document.body, "images/bg_scene_1.jpg");
    scoreMax.textContent = localStorage.getItem("meilleurScore");
    let points = 0;
    score.textContent = points;
    // On ajoute les bandits et on fait l'animation
    cadreJeu.appendChild(cowboy);
    let bandits = document.createElement("div");
    bandits.setAttribute("id", "bandits");
    bandits.style.width = "60vw";
    bandits.style.height = "36vh";
    cadreJeu.appendChild(bandits);
    let yBandits = "";
    let newYBandits = "";
    let xBandits = "";
    const diametreBandits = parseFloat(getComputedStyle(bandits).width); // Conversion en nombre du diametre du bandit
    genBandit();

    function animerBandits() {
        // Conversion en nombre de la position gauche du bloc
        xBandits = parseFloat(getComputedStyle(bandits).left);
        // Position basse du bloc
        yBandits = parseFloat(getComputedStyle(bandits).bottom);
        // Si les bandits arrivent a un bord du cadre
        if (((xBandits + diametreBandits) >= xMaxBandits) || (xBandits < xMin)) {
            // On inverse le sens de déplacement
            direction *= -1;
            newYBandits = yBandits - 30;
        } else if (yBandits <= topCowboy) {
            if (points > parseInt(scoreMax.textContent)) {
                //    Localstorage meilleur score
                localStorage.setItem("meilleurScore", points);
                // Retrieve
                scoreMax.textContent = localStorage.getItem("meilleurScore");

            }
            document.getElementById('game_over').style.display = "flex";
            changeBackground(document.body, "images/bg_scene_2.jpg");
            cancelAnimationFrame(animerBandits);
            cadreJeu.removeChild(bandits);
            delete(bandits);
            return;
        }
        // On descend le cadre
        bandits.style.bottom = newYBandits + "px";
        // Déplacement du bandit dans le sens actuel
        setInterval(function() {
            bandits.style.left = (xBandits + vitesseBandits * direction) + "px";
        }, 500);


        // Demande au navigateur d'appeler animerBandit dès que possible
        requestAnimationFrame(animerBandits);
    }
    requestAnimationFrame(animerBandits);

    // Ajout déplacement et tir
    document.onkeydown = function(event) {
        if (event.keyCode == 37) {
            gauche();
        }
        if (event.keyCode == 39) {
            droite()
        };
        if ((event.keyCode == 38) || (event.keyCode == 32)) {
            tir();

        }
    }

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
    //Tir
    function tir() {
        // On crée le proijectile
        let bullet = document.createElement("img");
        bullet.setAttribute("class", "bullet");
        bullet.setAttribute("src", "images/bullet.png");
        bullet.setAttribute("width", "163");
        bullet.setAttribute("height", "331");
        bullet.setAttribute("alt", "bullet");
        cadreJeu.appendChild(bullet);
        let topBullet = (parseFloat(getComputedStyle(cowboy).bottom)) + (parseFloat(getComputedStyle(cowboy).height));
        let yBullet = "";
        bullet.style.bottom = topBullet + "px";
        bullet.style.left = cowboy.offsetLeft + "px";
        // On anime le projectile
        function bulletMve() {
            let newYBullet = "";
            yBullet = parseFloat(getComputedStyle(bullet).bottom);
            newYBullet = (yBullet + vitesseBullet);
            //let hauteurCadreJeu = cadreJeu.offsetHeight;
            let hauteurCadreJeu = document.body.clientHeight - 100;
            bullet.style.bottom = (newYBullet + "px");
            if (newYBullet >= hauteurCadreJeu) {
                cadreJeu.removeChild(bullet);
                return;
            }
            // Eliminations des ennemis 
            let coordBullet = bullet.getBoundingClientRect();
            let banditArray = document.getElementsByClassName('bandit');
            for (var i = 0; i < banditArray.length; i++) {
                let coordBandit = banditArray[i].getBoundingClientRect();
                if (coordBullet.left < coordBandit.left + coordBandit.width && coordBullet.left + coordBullet.width > coordBandit.left && coordBullet.top < coordBandit.top + coordBandit.height && coordBullet.top + coordBullet.height > coordBandit.top) {
                    if (banditArray[i].className == 'bandit bandit1') {
                        points += 100
                        score.textContent = points;
                        bandits.removeChild(banditArray[i]);
                        delete(banditArray[i]);
                        bullet.style.display = "none";
                        if (banditArray.length == 0) {
                            if (points > parseInt(scoreMax.textContent)) {
                                localStorage.setItem("meilleurScore", points);
                                // Retrieve
                                scoreMax.textContent = localStorage.getItem("meilleurScore");
                            }
                            document.getElementById('win').style.display = "flex";
                            changeBackground(document.body, "images/bg_scene_2.jpg");
                            cancelAnimationFrame(animerBandits);
                            cadreJeu.removeChild(bandits);
                            delete(bandits);
                            pointsPartie.textContent = score.textContent;
                            return;
                        }
                    } else if (banditArray[i].className == 'bandit bandit2') {
                        points += 400;
                        score.textContent = points;
                        bandits.removeChild(banditArray[i]);
                        delete(banditArray[i]);
                        bullet.style.display = "none";
                        if (banditArray.length == 0) {
                            if (points > parseInt(scoreMax.textContent)) {
                                localStorage.setItem("meilleurScore", points);
                                // Retrieve
                                scoreMax.textContent = localStorage.getItem("meilleurScore");
                            }
                            document.getElementById('win').style.display = "flex";
                            changeBackground(document.body, "images/bg_scene_2.jpg");
                            cancelAnimationFrame(animerBandits);
                            cadreJeu.removeChild(bandits);
                            delete(bandits);
                            pointsPartie.textContent = score.textContent;
                            return;
                        }
                    } else if (banditArray[i].className == 'bandit bandit3') {
                        points += 250;
                        score.textContent = points;
                        bandits.removeChild(banditArray[i]);
                        delete(banditArray[i]);
                        bullet.style.display = "none";
                        if (banditArray.length == 0) {
                            if (points > parseInt(scoreMax.textContent)) {
                                localStorage.setItem("meilleurScore", points);
                                // Retrieve
                                scoreMax.textContent = localStorage.getItem("meilleurScore");
                            }
                            document.getElementById('win').style.display = "flex";
                            changeBackground(document.body, "images/bg_scene_2.jpg");
                            cancelAnimationFrame(animerBandits);
                            cadreJeu.removeChild(bandits);
                            delete(bandits);
                            pointsPartie.textContent = score.textContent;
                            return;
                        }
                    } else if (banditArray[i].className == 'bandit bandit4') {
                        points += 750;
                        score.textContent = points;
                        bandits.removeChild(banditArray[i]);
                        delete(banditArray[i]);
                        bullet.style.display = "none";
                        if (banditArray.length == 0) {
                            if (points > parseInt(scoreMax.textContent)) {
                                localStorage.setItem("meilleurScore", points);
                                // Retrieve
                                scoreMax.textContent = localStorage.getItem("meilleurScore");
                            }
                            document.getElementById('win').style.display = "flex";
                            changeBackground(document.body, "images/bg_scene_2.jpg");
                            cancelAnimationFrame(animerBandits);
                            cadreJeu.removeChild(bandits);
                            delete(bandits);
                            pointsPartie.textContent = score.textContent;
                            return;
                        }
                    } else if (banditArray[i].className == 'bandit bandit5') {
                        points += 500;
                        score.textContent = points;
                        bandits.removeChild(banditArray[i]);
                        delete(banditArray[i]);
                        bullet.style.display = "none";
                        if (banditArray.length == 0) {
                            if (points > parseInt(scoreMax.textContent)) {
                                localStorage.setItem("meilleurScore", points);
                                // Retrieve
                                scoreMax.textContent = localStorage.getItem("meilleurScore");
                            }
                            document.getElementById('win').style.display = "flex";
                            changeBackground(document.body, "images/bg_scene_2.jpg");
                            cancelAnimationFrame(animerBandits);
                            cadreJeu.removeChild(bandits);
                            delete(bandits);
                            pointsPartie.textContent = score.textContent;
                            return;
                        }
                    } else if (banditArray[i].className == 'bandit bandit6') {
                        points += 1000;
                        score.textContent = points;
                        bandits.removeChild(banditArray[i]);
                        delete(banditArray[i]);
                        bullet.style.display = "none";
                        if (banditArray.length == 0) {
                            if (points > parseInt(scoreMax.textContent)) {
                                localStorage.setItem("meilleurScore", points);
                                // Retrieve
                                scoreMax.textContent = localStorage.getItem("meilleurScore");
                            }
                            document.getElementById('win').style.display = "flex";
                            changeBackground(document.body, "images/bg_scene_2.jpg");
                            cancelAnimationFrame(animerBandits);
                            cadreJeu.removeChild(bandits);
                            delete(bandits);
                            pointsPartie.textContent = score.textContent;
                            return;
                        }
                    }
                }
            }
            requestAnimationFrame(bulletMve);
        }
        requestAnimationFrame(bulletMve);
    
    }

}

//Fonction getBandit à remplacer dans main.js
function genBandit() {
    var rang1 = 0;
    var rang2 = 0;
    var rang3 = 0;
    for (var i = 1; i <= 24; i++) {
        var bandit = document.createElement("div");
        var stockNb = Math.floor(Math.random() * Math.floor(6));
        //Bandit 1
        if (stockNb == 0) {
            bandit.style.backgroundImage = "url('images/bandit1.png')";
            bandit.style.backgroundSize = "auto 100%";
            bandit.setAttribute("class", "bandit bandit1");
            bandit.id = i;
        }
        //Bandit 2
        else if (stockNb == 1) {
            bandit.style.backgroundImage = "url('images/bandit2.png')";
            bandit.style.backgroundSize = "auto 100%";
            bandit.setAttribute("class", "bandit bandit2");
            bandit.id = i;
        }
        //Bandit 3
        else if (stockNb == 2) {
            bandit.style.backgroundImage = "url('images/bandit3.png')";
            bandit.style.backgroundSize = "auto 100%";
            bandit.setAttribute("class", "bandit bandit3");
            bandit.id = i;
        }
        //Bandit 4
        else if (stockNb == 3) {
            bandit.style.backgroundImage = "url('images/bandit4.png')";
            bandit.style.backgroundSize = "auto 100%";
            bandit.setAttribute("class", "bandit bandit4");
            bandit.id = i;
        }
        //Bandit 5
        else if (stockNb == 4) {
            bandit.style.backgroundImage = "url('images/bandit5.png')";
            bandit.style.backgroundSize = "auto 100%";
            bandit.setAttribute("class", "bandit bandit5");
            bandit.id = i;
        }
        //Bandit 6
        else if (stockNb == 5) {
            bandit.style.backgroundImage = "url('images/bandit6.png')";
            bandit.style.backgroundSize = "auto 100%";
            bandit.setAttribute("class", "bandit bandit6");
            bandit.id = i;
        }

        if (bandit.id < 9) {
            rang1 += 6;
            bandit.style.left = rang1 + "vw";
            bandits.appendChild(bandit);
        } else if (bandit.id >= 9 && i < 17) {
            rang2 += 6;
            bandit.style.top = "12vh";
            bandit.style.left = rang2 + "vw";
            bandits.appendChild(bandit);
        } else {
            rang3 += 6;
            bandit.style.top = "24vh";
            bandit.style.left = rang3 + "vw";
            bandits.appendChild(bandit);
        }
    }
}

// fonction changement bg
function changeBackground(bElement, bUrl) {
    return bElement.style.backgroundImage = "url(" + bUrl + ")";
}
// Ajout de la fonction jeu sur le bouton jouer
window.onload = jeu();

rejouerLose.addEventListener("click", function() {
    location.reload();
})
rejouerWin.addEventListener("click", function() {
    location.reload();
})