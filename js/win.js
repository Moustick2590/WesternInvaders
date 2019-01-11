function win() {

    document.getElementById('win').style.display = "flex";
    changeBackground(document.body, "images/bg_scene_2.jpg");
    cancelAnimationFrame(animerBandits);
    cadreJeu.removeChild(bandits);

}