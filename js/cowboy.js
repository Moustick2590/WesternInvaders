<<<<<<< HEAD
document.onkeydown = function(event) {
    if (event.keyCode == 37) gauche();
    if (event.keyCode == 39) droite();
    if (event.keyCode == 32) tir();
    
    
    let Bullet ={
        img.src = "../images/bullet.png";
        img.style.width = 10;
        img.style.height = 10;
        
    };
    
    
    function tir () {
    let newBullet =  Object.create(Bullet);
    newBullet.style.left = cowboy.left;
    newBullet.style.top = cowboy.top;
    newBullet.style.top += 20;
    }
    
=======
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
>>>>>>> a0a29b18d9586e3fc9783a6c9c539c772a52ebfa
