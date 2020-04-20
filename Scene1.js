class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.image('mainMenu', 'assets/images/mainMenu.png');
    this.load.image('background', 'assets/images/asphalt.png');
    this.load.image('playButton', 'assets/images/play-button.png');
    this.load.image('zooSign', 'assets/images/zooSign.png');
    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('signPost', 'assets/images/signPost.png');
    this.load.image('bank', 'assets/images/bank.png');
    this.load.image('houseyellow', 'assets/images/houseyellow.png');
    this.load.image('houseblue', 'assets/images/houseblue.png');
    this.load.image('housepink', 'assets/images/housepink.png');
    this.load.image('walmart', 'assets/images/walmart.png');
    this.load.image('vertwall', 'assets/images/vertwall.png');
    this.load.image('horwall', 'assets/images/horwall.png');
    this.load.image('player', 'assets/images/joe.png');
    this.load.image('carole', 'assets/images/carole.png');
    this.load.image('tiger', 'assets/images/tiger.png');
    this.load.image('agent', 'assets/images/agent.png');
    this.load.image('zooHut', 'assets/images/zooHut.png');
    this.load.image('cafe', 'assets/images/cafe.png');
    this.load.image('copcar', 'assets/images/copcar.png');
    this.load.audio('music', 
      'assets/sounds/theme.mp3',
    );
    this.load.audio('menuTheme', 
      'assets/sounds/menuTheme.mp3',
    );
    this.load.audio('itscarole', 
      'assets/sounds/itscarole.mp3',
    );
    this.load.audio('neverRecover', 
      'assets/sounds/neverRecover.mp3',
    );
    this.load.audio('coolcats', 
      'assets/sounds/coolcats.mp3',
    );
  }

  create() {
    this.menuTheme = this.sound.add('menuTheme');
    this.menuTheme.play();
    this.background = this.add.image(0, 0, 'mainMenu');
    this.background.setOrigin(0, 0);

    this.cameras.main.setViewport(5, 5, 390, 290);

    var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 40, 'playButton');
    playButton.setInteractive();

    playButton.on("pointerup", () => {
      this.cameras.main.fade(200);
      this.time.addEvent({ delay: 1000, callback: this.sceneSwitch, callbackScope: this, loop: false });
    })
    
  }
  
  sceneSwitch(){
    this.menuTheme.stop();
    this.scene.start("playGame");
}

}
