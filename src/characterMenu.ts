import Phaser from 'phaser'

export default class characterMenu extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite
    //private player?: Phaser.GameObjects.GameObject
    private arrows?: Phaser.Physics.Arcade.StaticGroup
    private colorTiles?: Phaser.GameObjects.GameObject
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    constructor(){
        super({key : 'char-menu'})
    }
    preload(){
        this.load.image('bg', 'assets/sky.png') //replace asset later

        //fish character
        this.load.spritesheet('fish', 'assets/fish.png', { frameWidth: 1000, frameHeight: 1000})
        //arrows
        this.load.image('rightArrow', 'assets/rightArrow.png')
        //tiles
        this.load.image('tile', 'assets/tile.jpg')
        //text menu
    }
    create(){
        this.arrows = this.physics.add.staticGroup()
        this.cursors = this.input.keyboard.createCursorKeys() //for scene switching delete later
        this.add.image(400, 300, 'bg')

        const fish = this.physics.add.sprite(200, 250, 'fish').setInteractive()
        fish.setScale(0.5)
        fish.body.allowGravity = false

        //arrows
        const right = this.arrows.create(725, 250, 'rightArrow').setScale(0.25).setInteractive()
        var left = this.add.image(350, 250, 'rightArrow').setFlipX(true).setScale(0.25).setInteractive()

        //tiles
        var hat1 = this.add.image(425, 175, 'tile').setScale(0.25)
        var hat2 = this.add.image(500, 175, 'tile').setScale(0.25)
        var hat3 = this.add.image(575, 175, 'tile').setScale(0.25)
        var hat4 = this.add.image(650, 175, 'tile').setScale(0.25)

        var glasses1 = this.add.image(425, 275, 'tile').setScale(0.25)
        var glasses2 = this.add.image(500, 275, 'tile').setScale(0.25)
        var glasses3 = this.add.image(575, 275, 'tile').setScale(0.25)
        var glasses4 = this.add.image(650, 275, 'tile').setScale(0.25)

        //colors
        var red = this.add.image(400, 375, 'tile').setScale(0.125).setTint(0x85251B).setInteractive();      
        var orange = this.add.image(450, 375, 'tile').setScale(0.125).setTint(0x874E0F).setInteractive();
        var yellow = this.add.image(500, 375, 'tile').setScale(0.125).setTint(0xB2B037).setInteractive();
        var green = this.add.image(550, 375, 'tile').setScale(0.125).setTint(0x4C7940).setInteractive();
        var lightblue = this.add.image(600, 375, 'tile').setScale(0.125).setTint(0x7F9293).setInteractive();        
        var darkblue = this.add.image(650, 375, 'tile').setScale(0.125).setTint(0x383A4B).setInteractive();
        var purple = this.add.image(400, 425, 'tile').setScale(0.125).setTint(0x6F5F78).setInteractive();
        var pink = this.add.image(450, 425, 'tile').setScale(0.125).setTint(0xD6A16B).setInteractive();

        //test glowing thing, not working yet
        this.colorTiles = this.physics.add.sprite(100, 100, 'tile')

        //clicking on arrows, this works
        right.on('pointerover', function (pointer){
            this.setTint(0xff0000)
        })
        right.on('pointerout', function (pointer){
            this.clearTint()
        })
        
    }
    update(){
        if (!this.cursors){
			return
		}
		if (this.cursors.shift?.isDown){
			//this.scene.restart()
			this.scene.start('hello-world') 
		}
    }
}