class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.image('background', 'assets/images/asphalt.png');
    this.load.image('building', 'assets/images/building.png');
    this.load.image('player', 'assets/images/lalo.png');
    this.load.image('agent', 'assets/images/agent.png');
    this.load.image('methbag', 'assets/images/methbag.png');
    this.load.audio('music', 
      'assets/sounds/theme.mp3',
    );
  }

  create() {
    this.add.text(20, 20, 'Loading game...');
    this.scene.start('playGame');
}

}
