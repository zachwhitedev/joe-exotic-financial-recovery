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
      debug: true,
      gravity: { y: 0 }
    }
  }
};


var game = new Phaser.Game(config);

document.addEventListener("DOMContentLoaded", function(event) { 
  if(localStorage.getItem('username')){
    let username = localStorage.getItem('username');
    let showUsername = document.getElementById('show-username');
    showUsername.innerHTML = `Welcome, ${username}. Whether you're broke as sh*t, try drugs, or have kinky sex, we love and accept you.`;
  }
});


function setUsername(){
  let username = document.forms[0].elements[0].value
  localStorage.setItem('username', username.toString())
}
