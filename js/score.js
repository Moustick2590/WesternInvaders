//Score
let score = 0;
let scoreMax = 0;


//Changement du meilleur score
if (score > scoreMax) {
    scoreMax = score;
}

//Fonction getBandit à remplacer dans main.js
function genBandit() {
    for (var i = 1; i <= 24; i++) {
        var bandit = document.createElement("div");
        var stockNb = Math.floor(Math.random() * Math.floor(6));
        console.log(stockNb);

        //Bandit 1
        if (stockNb == 0) {
            bandit.style.backgroundImage = "url('images/bandit1.png')";
            bandit.style.backgroundSize = "100%";
            bandit.setAttribute("class", "bandit bandit1");
        }
        //Bandit 2
        else if (stockNb == 1) {
            bandit.style.backgroundImage = "url('images/bandit2.png')";
            bandit.style.backgroundSize = "100%";
            bandit.setAttribute("class", "bandit bandit2");
        }
        //Bandit 3
        else if (stockNb == 2) {
            bandit.style.backgroundImage = "url('images/bandit3.png')";
            bandit.style.backgroundSize = "100%";
            bandit.setAttribute("class", "bandit bandit3");
        }
        //Bandit 4
        else if (stockNb == 3) {
            bandit.style.backgroundImage = "url('images/bandit4.png')";
            bandit.style.backgroundSize = "100%";
            bandit.setAttribute("class", "bandit bandit4");
        }
        //Bandit 5
        else if (stockNb == 4) {
            bandit.style.backgroundImage = "url('images/bandit5.png')";
            bandit.style.backgroundSize = "100%";
            bandit.setAttribute("class", "bandit bandit5");
        }
        //Bandit 6
        else if (stockNb == 5) {
            bandit.style.backgroundImage = "url('images/bandit6.png')";
            bandit.style.backgroundSize = "100%";
            bandit.setAttribute("class", "bandit bandit6");
        }
        bandit.setAttribute("id", "bandit" + i);
        bandit.style.display = "inline-block";

        document.getElementById("bandits").appendChild(bandit);

    }
}

//Points à chaque collision (à mettre dans la fonction collision)
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

//Ecriture des scores
document.getElementById("score").innerHTML = score;
document.getElementById("scoremax").innerHTML = scoreMax;