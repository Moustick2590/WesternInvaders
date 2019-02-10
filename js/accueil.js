const jouer = document.getElementById("boutonjouer");
const explication = document.getElementById("explication");
let scoreMax = document.getElementById('scoremax');

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

scoreMax.textContent = localStorage.setItem("meilleurScore", 0);
scoreMax.textContent = localStorage.getItem("meilleurScore");