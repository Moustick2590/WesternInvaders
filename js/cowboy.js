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
    