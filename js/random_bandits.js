//Ennemis
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