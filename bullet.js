// 3.1 create the beam class
// 3.1 NOTE dont forget to add this file in the index.html file
class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene){
  
      var x = scene.player.x + 3;
      var y = scene.player.y;
  
      super(scene, x, y, "bullet");
  
      // 3.2 add to scene
      scene.add.existing(this);
  
      // 3.3
      scene.physics.world.enableBody(this);
      this.body.velocity.x = 250;
  
  
      // 4.2 add the beam to the projectiles group
      scene.projectiles.add(this);
    }
  
  
    update(){
      // 3.4 Frustum culling
      if(this.x > 410 || this.x < -10 || this.x > 410 || this.y < -10){
        this.destroy();
      }
    }
  }