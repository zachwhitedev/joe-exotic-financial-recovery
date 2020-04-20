class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  preload() {}

  create() {
    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player = this.physics.add.image(30, 35, 'player');
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.projectiles = this.add.group();

    //////// INITIAL TIGERS ////////
    this.tiger = this.physics.add.image(300, 100, 'tiger');
    this.tiger.setCollideWorldBounds(true);
    this.tiger2 = this.physics.add.image(60, 120, 'tiger');
    this.tiger2.setCollideWorldBounds(true);
    this.tiger3 = this.physics.add.image(40, 240, 'tiger');
    this.tiger3.setCollideWorldBounds(true);

    this.tiger.setVelocity(Phaser.Math.Between(-20, 20), 20);
    this.tiger.setBounce(1);
    this.tiger2.setVelocity(Phaser.Math.Between(-20, 20), -20);
    this.tiger2.setBounce(1);
    this.tiger3.setVelocity(Phaser.Math.Between(-20, 20), 20);
    this.tiger3.setBounce(1);
    //////////////////////////////////

    this.agent = this.physics.add.image(
      300,
      Phaser.Math.Between(280, 340),
      'agent'
    );
    this.agent.setCollideWorldBounds(true);

    ///////////// BUILDINGS /////////////////
    this.bank = this.add.image(120, 245, 'bank');
    this.cafe = this.add.image(224, 252, 'cafe');
    this.zooHut = this.add.image(122, 94, 'zooHut');
    this.houseyellow = this.add.image(105, 32, 'houseyellow');
    this.houseyellow2 = this.add.image(320, 32, 'houseyellow');
    this.houseblue = this.add.image(368, 32, 'houseblue');
    this.houseblue2 = this.add.image(230, 32, 'houseblue');
    this.housepink = this.add.image(185, 32, 'housepink');
    this.walmart = this.add.image(371, 116, 'walmart');

    this.signPost = this.add.image(121, 149, 'signPost');
    this.signPost.setSize(6, 29);
    this.zooSign = this.add.image(120, 130, 'zooSign');
    this.zooSign.setScale(0.55);
    this.signPost.setScale(0.5);
    this.zooSign.angle -= 5;

    this.topBarrier = this.add.image(20, 8, 'horwall');
    this.topBarrier2 = this.add.image(190, 8, 'horwall');
    this.topBarrier3 = this.add.image(326, 8, 'horwall');
    this.topBarrier.setSize(110, 6);
    this.topBarrier2.setSize(62, 6);
    this.topBarrier3.setSize(90, 6);

    this.vertwall = this.add.image(162, 96, 'vertwall');
    this.vertwall.setSize(6, 35); //
    this.vertwall2 = this.add.image(162, 136, 'vertwall');
    this.vertwall2.setSize(6, 35); //
    this.vertwall3 = this.add.image(252, 96, 'vertwall');
    this.vertwall3.setSize(6, 35); //
    this.vertwall4 = this.add.image(252, 134, 'vertwall');
    this.vertwall4.setSize(6, 35); //

    this.horwall = this.add.image(186, 154, 'horwall');
    this.horwall.setSize(38, 6);
    this.horwall2 = this.add.image(230, 154, 'horwall');
    this.horwall2.setSize(38, 6);
    this.horwall3 = this.add.image(186, 82, 'horwall');
    this.horwall3.setSize(38, 6);
    this.horwall4 = this.add.image(230, 82, 'horwall');
    this.horwall4.setSize(38, 6);

    this.buildings = this.physics.add.staticGroup();
    this.buildings.add(this.bank);
    this.buildings.add(this.houseyellow);
    this.buildings.add(this.houseyellow2);
    this.buildings.add(this.houseblue);
    this.buildings.add(this.houseblue2);
    this.buildings.add(this.housepink);
    this.buildings.add(this.walmart);
    this.buildings.add(this.vertwall);
    this.buildings.add(this.vertwall2);
    this.buildings.add(this.vertwall3);
    this.buildings.add(this.vertwall4);
    this.buildings.add(this.horwall);
    this.buildings.add(this.horwall2);
    this.buildings.add(this.horwall3);
    this.buildings.add(this.horwall4);
    this.buildings.add(this.signPost);
    this.buildings.add(this.topBarrier);
    this.buildings.add(this.topBarrier2);
    this.buildings.add(this.topBarrier3);
    this.buildings.add(this.zooHut);
    this.buildings.add(this.cafe);
    /////////////////////////////////////////

    this.tigers = this.add.group();
    this.tigers.add(this.tiger);
    this.tigers.add(this.tiger2);
    this.tigers.add(this.tiger3);

    this.enemies = this.add.group();
    this.enemies.add(this.agent);
    this.copCars = this.add.group();

    this.agent.setVelocity(-10, 10);
    this.agent.setBounce(0.9);

    this.physics.add.collider(this.tigers, this.tigers);
    this.physics.add.collider(this.tigers, this.buildings);
    this.physics.add.collider(this.buildings, this.player);
    this.physics.add.collider(this.enemies, this.buildings);
    this.physics.add.collider(this.enemies, this.enemies);

    this.physics.add.overlap(
      this.player,
      this.tigers,
      this.collectTiger,
      null,
      this
    );
    this.physics.add.overlap(
      this.enemies,
      this.tigers,
      this.fedsTakeTiger,
      null,
      this
    );
    this.physics.add.overlap(
      this.copCars,
      this.tigers,
      this.fedsTakeTiger,
      null,
      this
    );
    this.physics.add.overlap(
      this.copCars,
      this.player,
      this.gameLose,
      null,
      this
    );
    this.physics.add.overlap(
      this.enemies,
      this.player,
      this.gameLose,
      null,
      this
    );
    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.projectiles,
      this.tigers,
      this.noHit,
      null,
      this
    );
    this.physics.add.overlap(
      this.projectiles,
      this.buildings,
      this.noHit,
      null,
      this
    );


    //////// score label ///////
    this.graphics = this.add.graphics();
    this.graphics.fillStyle(0x000000, 1);
    this.graphics.beginPath();
    this.graphics.moveTo(0, 0);
    this.graphics.lineTo(config.width, 0);
    this.graphics.lineTo(config.width, 20);
    this.graphics.lineTo(0, 20);
    this.graphics.lineTo(0, 0);
    this.graphics.closePath();
    this.graphics.fillPath();
    this.laloScore = 10000;
    this.laloScoreLabel = this.add.text(
      5,
      5,
      'Joe Exotic Net Worth: $' + this.laloScore,
      {
        fontSize: '12px',
        fill: 'lime',
      }
    );
    this.totalScore = 0;
    this.totalScoreLabel = this.add.text(290, 5, 'SCORE: ' + this.totalScore, {
      fontSize: '12px',
      fill: 'lime',
    });

    //////// sfx ///////////

    this.ohno = this.sound.add('itscarole');
    this.revolver = this.sound.add('revolver');
    this.neverRecover = this.sound.add('neverRecover');
    this.coolcats = this.sound.add('coolcats');
    this.music = this.sound.add('music');
    var musicConfig = {
      mute: false,
      volume: 0.1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    this.music.play(musicConfig);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shootBeam();
    }
    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
      var beam = this.projectiles.getChildren()[i];
      beam.update();
    }
    if (this.totalScore % 750 == 0) {
      this.sendCopCar();
    }
    if (this.totalScore % 3000 == 0 && this.totalScore != 0) {
      this.addCarole();
    } else if (this.totalScore % 1000 == 0 && this.totalScore != 0) {
      this.addAgent();
      this.addTiger();
    }
    this.totalScore += 1;
    this.totalScoreLabel.text = 'SCORE: ' + this.totalScore;
    this.movePlayerManager();
    if (this.laloScore <= -1) {
      this.gameLose();
    }
  }

  movePlayerManager() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-120);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(120);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-120);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(120);
    } else {
      this.player.setVelocityY(0);
    }
  }

  shootBeam() {
    if (this.player.active) {
      var bullet = new Bullet(this);
    }
  }

  hitEnemy(projectile, enemy) {
    projectile.destroy();
    enemy.destroy();
    this.time.addEvent({
      delay: 3000,
      callback: this.addAgent,
      callbackScope: this,
      loop: false,
    });
  }
  noHit(projectile, enemy) {
    projectile.destroy();
  }

  collectTiger(player, tiger) {
    this.laloScore += 1000;
    this.laloScoreLabel.text = 'Joe Exotic Net Worth: $' + this.laloScore;

    tiger.x = Phaser.Math.Between(190, 230);
    tiger.y = Phaser.Math.Between(100, 132);
    tiger.setVelocity(2);
    this.time.addEvent({
      delay: 3000,
      callback: this.addTiger,
      callbackScope: this,
      loop: false,
    });
  }

  addTiger() {
    var x =
      this.player.x < 200
        ? Phaser.Math.Between(330, 380)
        : Phaser.Math.Between(20, 100);
    var y =
      this.player.y < 150
        ? Phaser.Math.Between(260, 280)
        : Phaser.Math.Between(20, 100);
    var newTiger = this.physics.add.image(x, y, 'tiger');
    newTiger.setVelocity(20);
    newTiger.setBounce(1);
    newTiger.setCollideWorldBounds(true);
    this.tigers.add(newTiger);
  }

  fedsTakeTiger(enemy, tiger) {
    this.laloScore -= 1000;
    this.laloScoreLabel.text = 'Joe Exotic Net Worth: $' + this.laloScore;
    tiger.destroy();
    this.time.addEvent({
      delay: 3000,
      callback: this.addTiger,
      callbackScope: this,
      loop: false,
    });
  }

  gameLose() {
    this.killLiveMusic();
    if (localStorage.getItem('username')) {
      (async () => {
        const rawResponse = await fetch(
          'https://www.v8asdfhajkfh.org/tigerleaderboard',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: localStorage.getItem('username'),
              score: this.laloScore,
            }),
          }
        );
        const content = await rawResponse.json();

        console.log(content);
      })();
    }
    var recoverConfig = {
      mute: false,
      volume: 8,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    this.neverRecover.play(recoverConfig);
    alert('Game over! YOUR SCORE: ' + this.totalScore);
    this.player.x = 22;
    this.player.y = 120;
    this.laloScore = 10000;
    this.laloScoreLabel.text = 'Joe Exotic Net Worth: $' + this.laloScore;
    this.scene.start('playGame');
  }
  gameWin() {
    alert('YOU WON!!! YOU ARE A FRIEND OF THE CARTEL!! WOOHOO!!!!! $$$$$$$');
    this.player.x = 22;
    this.player.y = 120;
    this.laloScore = 10000;
    this.laloScoreLabel.text = 'Joe Exotic Net Worth: $' + this.laloScore;
  }
  addAgent() {
    var newAgent = this.physics.add.image(Phaser.Math.Between(-10, 380), 350, 'agent');
    newAgent.setVelocityY(-15);
    newAgent.setVelocityX(15);
    newAgent.setBounce(1);
    newAgent.setCollideWorldBounds(true);
    this.enemies.add(newAgent);
  }

  sendCopCar() {
    var copCar = this.physics.add.image(-25, 193, 'copcar');
    copCar.setVelocityX(135);
    copCar.setBounce(0);
    copCar.setCollideWorldBounds(false);
    this.copCars.add(copCar);
    this.addTiger();
  }

  addCarole() {
    this.coolcats.play();
    var bitchConfig = {
      mute: false,
      volume: 8,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 2,
    };
    this.ohno.play(bitchConfig);

    var newCarole = this.physics.add.image(320, 150, 'carole');
    newCarole.setVelocityX(-85);
    newCarole.setBounce(1);
    this.enemies.add(newCarole);
    this.addTiger();
  }

  killLiveMusic() {
    this.music.stop();
    this.ohno.stop();
    this.coolcats.stop();
    this.music.pause();
    this.ohno.pause();
    this.coolcats.pause();
    this.time.addEvent({
      delay: 3000,
      callback: this.killLiveMusic,
      callbackScope: this,
      loop: false,
    });
  }
}
