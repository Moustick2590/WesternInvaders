document.onkeypress = function(event) {

    var gameHeight = parseFloat(getComputedStyle(game).height);
    console.log(gameHeight);


    if (event.keyCode == 106) {
        var bullet = document.createElement("img");
        bullet.setAttribute("id", "bullet");
        bullet.setAttribute("src", "img/bullet.png");
        bullet.setAttribute("width", "40");
        bullet.setAttribute("height", "40");
        bullet.setAttribute("alt", "bullet");
        document.getElementById("player_container").appendChild(bullet);

        function bulletMove() {

            var vitesse2 = 7; // Valeur du déplacement en pixels
            // Conversion en nombre de la position gauche du bullet (valeur de la forme "XXpx")
            var xBullet = parseFloat(getComputedStyle(bullet).bottom);

            // Déplacement du bloc
            bullet.style.bottom = (xBullet + vitesse2) + "px";

            if (xBullet >= gameHeight) {
                bullet.parentNode.removeChild(bullet);
            }


            // Demande au navigateur d'appeler bulletMove dès que possible
            requestAnimationFrame(bulletMove);

        }
        requestAnimationFrame(bulletMove);
    }

}