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
