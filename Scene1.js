class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    fetch(
      'https://vf8huftlq6.execute-api.us-west-2.amazonaws.com/dev/gettigerscores'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const scores = data.body.scores;
        let table = document.getElementById('leaderboard');
        for (var i = 0; i < scores.length; i++) {
          var tr = document.createElement('tr');

          var td1 = document.createElement('td');
          var td2 = document.createElement('td');
          var td3 = document.createElement('td');

          var text1 = document.createTextNode(`${i + 1}`);
          var text2 = document.createTextNode(`${scores[i].username}`);
          var text3 = document.createTextNode(`${scores[i].score}`);
          
          td1.appendChild(text1);
          td2.appendChild(text2);
          td3.appendChild(text3);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);

          table.appendChild(tr);
        }
        document.body.appendChild(table);
      })
    this.load.image('mainMenu', 'assets/images/mainMenu.png');
    this.load.image('background', 'assets/images/asphalt.png');
    this.load.image('scoreboard', 'assets/images/scoreboard.png');
    this.load.image('playButton', 'assets/images/play-button.png');
    this.load.image('zooSign', 'assets/images/zooSign.png');
    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('signPost', 'assets/images/signPost.png');
    this.load.image('bank', 'assets/images/bank.png');
    this.load.image('station', 'assets/images/station.png');
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
    this.load.audio('music', 'assets/sounds/menuTheme.mp3');
    this.load.audio('menuTheme', 'assets/sounds/theme.mp3');
    this.load.audio('itscarole', 'assets/sounds/itscarole.mp3');
    this.load.audio('neverRecover', 'assets/sounds/neverRecover.mp3');
    this.load.audio('coolcats', 'assets/sounds/coolcats.mp3');
    this.load.audio('revolver', 'assets/sounds/revolver.mp3');
    this.load.audio('takeThat', 'assets/sounds/takeThat.mp3');
    this.load.audio('killCarole', 'assets/sounds/killCarole.mp3');
    this.load.audio('touchMyTiger', 'assets/sounds/touchMyTiger.mp3');
  }

  create() {
    this.menuTheme = this.sound.add('menuTheme');
    let menuConfig = {
      volume: .01
    }
    this.menuTheme.play(menuConfig);
    this.background = this.add.image(0, 0, 'mainMenu');
    this.background.setOrigin(0, 0);

    this.cameras.main.setViewport(5, 5, 390, 290);

    this.playButton = this.add.image(
      this.game.renderer.width / 2,
      this.game.renderer.height / 2 + 40,
      'playButton'
    );
    this.playButton.setInteractive();

  }
  
  update(){
    this.playButton.on('pointerup', () => {
      this.cameras.main.fade(200);
      this.time.addEvent({
        delay: 1000,
        callback: this.sceneSwitch,
        callbackScope: this,
        loop: false,
      });
    });

  }

  sceneSwitch() {
    this.menuTheme.stop();
    this.scene.start('playGame');
  }
}
