class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  preload() {}

  create() {
    this.background = this.add.image(0, 0, 'background');

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player = this.physics.add.image(20, 160, 'player');
    this.player.setCollideWorldBounds(true);

    this.agent = this.physics.add.image(300, 300, 'agent');
    this.agent.setCollideWorldBounds(true);
    this.agent2 = this.physics.add.image(300, 300, 'agent');
    this.agent2.setCollideWorldBounds(true);

    this.background.setOrigin(0, 0);
    this.building = this.add.image(80, 100, 'building');
    this.building2 = this.add.image(200, 10, 'building');
    this.building3 = this.add.image(210, 180, 'building');
    this.building4 = this.add.image(70, 220, 'building');
    this.building5 = this.add.image(340, 140, 'building');

    this.buildings = this.physics.add.staticGroup();
    this.buildings.add(this.building);
    this.buildings.add(this.building2);
    this.buildings.add(this.building3);
    this.buildings.add(this.building4);
    this.buildings.add(this.building5);

    this.enemies = this.add.group();
    this.enemies.add(this.agent);
    this.enemies.add(this.agent2);

    this.agent.setVelocity(40, 40);
    this.agent.setBounce(1);
    this.agent2.setVelocity(70, 70);
    this.agent2.setBounce(1);

    this.meth = this.physics.add.group({
      key: 'methbag',
      setXY: { x: 20, y: 35 },
      repeat: 0,
    });

    this.physics.add.collider(this.buildings, this.player);
    this.physics.add.collider(this.enemies, this.buildings);
    this.physics.add.collider(this.enemies, this.enemies);

    this.physics.add.overlap(
      this.player,
      this.meth,
      this.collectMeth,
      null,
      this
    );
    this.physics.add.overlap(
      this.enemies,
      this.meth,
      this.fedsTakeMeth,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.gameLose,
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
    this.laloScore = 0;
    this.fedScore = 0;
    this.laloScoreLabel = this.add.text(5, 5, 'Lalo: ' + this.laloScore, {
      fontSize: '14px',
      fill: 'lime',
    });
    this.fedScoreLabel = this.add.text(340, 5, 'DEA: ' + this.fedScore, {
      fontSize: '14px',
      fill: 'lime',
    });

    //////// sfx ///////////

    this.music = this.sound.add('music');
    var musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    this.music.play(musicConfig);
  }

  update() {
    this.movePlayerManager();
    if (this.laloScore >= 10) {
      this.gameWin();
    } else if (this.fedScore >= 10) {
      this.gameLose();
    }
  }

  movePlayerManager() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-100);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(100);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-100);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(100);
    } else {
      this.player.setVelocityY(0);
    }
  }

  collectMeth(player, meth) {
    this.laloScore += 1;
    this.laloScoreLabel.text = 'Lalo: ' + this.laloScore;
    meth.destroy();
    var x =
      player.x < 200
        ? Phaser.Math.Between(200, 400)
        : Phaser.Math.Between(0, 200);
    var newMeth = this.meth.create(x, Phaser.Math.Between(40, 290), 'methbag');
    newMeth.setBounce(1);
    newMeth.setCollideWorldBounds(true);
    this.physics.add.collider(this.meth, this.buildings);
    newMeth.setVelocity(Phaser.Math.Between(-30, 30), 30);
  }

  fedsTakeMeth(enemy, meth) {
    this.fedScore += 1;
    this.fedScoreLabel.text = 'DEA: ' + this.fedScore;
    meth.destroy();
    var x =
      this.player.x < 200
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
    var newMeth = this.meth.create(x, 16, 'methbag');
    newMeth.setBounce(1);
    newMeth.setCollideWorldBounds(true);
    this.physics.add.collider(this.meth, this.buildings);
    newMeth.setVelocity(Phaser.Math.Between(-30, 30), 30);
  }

  gameLose() {
    alert('Game over!');
    this.player.x = 38;
    this.player.y = 10;
    this.fedScore = 0;
    this.fedScoreLabel.text = 'DEA: 0';
    this.laloScore = 0;
    this.laloScoreLabel.text = 'Lalo: 0';
  }
  gameWin() {
    alert('YOU WON!!! YOU ARE A FRIEND OF THE CARTEL!! WOOHOO!!!!! $$$$$$$');
    this.player.x = 38;
    this.player.y = 10;
    this.fedScore = 0;
    this.fedScoreLabel.text = 'DEA: 0';
    this.laloScore = 0;
    this.laloScoreLabel.text = 'Lalo: 0';
  }
}
