class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.image('background', 'assets/images/asphalt.png');
    this.load.image('bank', 'assets/images/bank.png');
    this.load.image('houseyellow', 'assets/images/houseyellow.png');
    this.load.image('houseblue', 'assets/images/houseblue.png');
    this.load.image('housepink', 'assets/images/housepink.png');
    this.load.image('walmart', 'assets/images/walmart.png');
    this.load.image('vertwall', 'assets/images/vertwall.png');
    this.load.image('horwall', 'assets/images/horwall.png');
    this.load.image('player', 'assets/images/joe.png');
    this.load.image('tiger', 'assets/images/tiger.png');
    this.load.image('agent', 'assets/images/agent.png');
    this.load.audio('music', 
      'assets/sounds/theme.mp3',
    );
  }

  create() {
    this.add.text(20, 20, 'Loading game...');
    this.scene.start('playGame');
}

}
