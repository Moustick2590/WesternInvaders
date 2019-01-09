document.onkeydown = function(event) {
    if (event.keyCode == 37) gauche();
    if (event.keyCode == 39) droite();
    if (event.keyCode == 32) tir();
    
    
    
//Debut tir 
    let Bullet ={
        img.src = "../images/bullet.png";
        img.style.width = 10;
        img.style.height = 10;
        
    };
    
    
    function tir () {
    
        //Tant que le bullet traverse l'écran 
        while(bullet.style.bottom < (100% + bullet.style.height)){
        
            //Si il y a une collision
            if (collision) {
        
            }
            else {
                bullet.style.bottom += 5%;
                
            }
          }
//Fin tir 