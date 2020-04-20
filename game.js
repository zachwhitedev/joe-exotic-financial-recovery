var config = {
  width: 400,
  height: 300,
  parent: 'game-container',
  scene: [Scene1, Scene2],
  pixelArt: true,
  zoom: 2,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  }
};


var game = new Phaser.Game(config);

document.addEventListener("DOMContentLoaded", function(event) { 
  if(localStorage.getItem('username')){
    let username = localStorage.getItem('username');
    let showUsername = document.getElementById('show-username');
    showUsername.innerHTML = `Welcome, ${username}`;
  }
});


function setUsername(){
  let username = document.forms[0].elements[0].value
  localStorage.setItem('username', username.toString())
}
