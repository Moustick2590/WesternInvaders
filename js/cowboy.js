document.onkeydown = function(event) {
    if (event.keyCode == 37) gauche();
    if (event.keyCode == 39) droite();
    if (event.keyCode == 32) tir();
    
    
    let Bullet ={
        img.src = "../images/bullet.png";
    };
    
    
    function tir () {
    let newBullet =  Object.create(Bullet);
    this.posX = cowboy.left;
    this.posY = cowboy.top;
    }
    