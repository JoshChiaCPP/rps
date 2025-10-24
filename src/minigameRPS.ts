import Phaser from 'phaser'
import { TimerBar } from './TimerBar'

export default class minigameRPS extends Phaser.Scene {
    private timerBar!: TimerBar;
    private timerText?: Phaser.GameObjects.Text
    private initialTime: number = 10
    private timerEvent!: Phaser.Time.TimerEvent;
    //cards
    private claw!: Phaser.GameObjects.Sprite //see if ? or ! makes any meaningful difference
    private kelp!: Phaser.GameObjects.Sprite
    private coral!: Phaser.GameObjects.Sprite

    //global mouse click cooldown
    private canClick: boolean = true;

    //Game Text
    private playerSelection!: Phaser.GameObjects.Text
    private opponentSelection!: Phaser.GameObjects.Text

    //just for resetting the scene with shift, no game functionality yet
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

    constructor(){
        super({key : 'rps'})
    }
    preload(){
        this.load.image('bg', 'assets/sky.png') //replace asset later
        this.load.spritesheet('kelp', 'assets/kelp.png', { frameWidth: 1000, frameHeight: 1000})
        this.load.spritesheet('claw', 'assets/claw.png', { frameWidth: 1000, frameHeight: 1000})
        this.load.spritesheet('coral', 'assets/coral.png', { frameWidth: 1000, frameHeight: 1000})
    }
    create(){
        this.add.image(400, 300, 'bg')
        this.input.on('pointerdown', this.handleGlobalClick, this);
        //create playing cards
        this.claw = this.add.sprite(200, 300, 'claw').setScale(0.15).setInteractive()

        this.kelp = this.add.sprite(400, 300, 'kelp').setScale(0.15).setInteractive()

        this.coral = this.add.sprite(600, 300, 'coral').setScale(0.18).setInteractive()

        const originalPosY = this.claw.y

        //round timer
        this.timerBar = new TimerBar(this, 100, 50, 600, 20, 10000);
        this.timerText = this.add.text((this.cameras.main.worldView.x + this.cameras.main.width / 2), 30, `${this.initialTime}`, {
			fontSize: '32px',
			color: '#000'
		})
        this.timerText.setOrigin(0.5,0.5)
        this.timerEvent = this.time.addEvent({
                delay: 1000, // 1 second
                callback: this.onTimerTick,
                callbackScope: this,
                loop: true
            });

        //player selection text
        this.playerSelection = this.add.text((this.cameras.main.worldView.x + this.cameras.main.width / 2), 500, "Select A Card!", {
			fontSize: '32px',
			color: '#000'
		})
        this.playerSelection.setOrigin(0.5,0.5)


        //mouse hover interactions for the cards. originalPosY = 300
        this.claw.on('pointerdown', () => {
            if(this.canClick){
                if (this.claw.y == originalPosY){
                    this.tweens.add({
                        targets: this.claw,
                        y: this.claw.y - 100,
                        duration: 300,
                        ease: 'Power1'
                    })
                    this.playerSelection.setText("Claw!")
                }
                if (this.kelp.y != originalPosY){
                    this.tweens.add({
                    targets: this.kelp,
                        y: this.kelp.y + 100,
                        duration: 300,
                        ease: 'Power1'
                    })
                }
                if (this.coral.y != originalPosY){
                    this.tweens.add({
                    targets: this.coral,
                        y: this.coral.y + 100,
                        duration: 300,
                        ease: 'Power1'
                    })
                }
            }                   
        });
        this.kelp.on('pointerdown', () => {
            if(this.canClick){
                if (this.claw.y != originalPosY){
                    this.tweens.add({
                        targets: this.claw,
                        y: this.claw.y + 100,
                        duration: 300,
                        ease: 'Power1'
                    })
                }
                if (this.kelp.y == originalPosY){
                    this.tweens.add({
                        targets: this.kelp,
                        y: this.kelp.y - 100,
                        duration: 300,
                        ease: 'Power1'
                    })
                    this.playerSelection.setText("Kelp!")
                }
                if (this.coral.y != originalPosY){
                    this.tweens.add({
                        targets: this.coral,
                        y: this.coral.y + 100,
                        duration: 300,
                        ease: 'Power1'
                    })
                }     
            }               
        });
        this.coral.on('pointerdown', () => {
            if (this.canClick){
                if (this.claw.y != originalPosY){
                    this.tweens.add({
                        targets: this.claw,
                        y: this.claw.y + 100,
                        duration: 300,
                        ease: 'Power1'
                    })
                }
                if (this.kelp.y != originalPosY){
                    this.tweens.add({
                        targets: this.kelp,
                        y: this.kelp.y + 100,
                        duration: 300,
                        ease: 'Power1'
                    })
                }
                if (this.coral.y == originalPosY){
                    this.tweens.add({
                        targets: this.coral,
                        y: this.coral.y - 100,
                        duration: 300,
                        ease: 'Power1'
                    })
                    this.playerSelection.setText("Coral!")
                }
            }                    
        });

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    private handleGlobalClick(): void {
        if (this.initialTime > 0){
            if (this.canClick) {
            // The click is allowed
            //console.log('Global click registered!');
        
            
            // Schedule the re-enabling of clicks after 0.301 seconds 
            this.time.delayedCall(301, () => {
                this.canClick = true;
                //console.log('Click cooldown finished.');
            }, [], this);
            } else {
            // Cooldown is active
            //console.log('Global click ignored (cooldown active)...');
            }
        }
        this.canClick = false;
    }
    private onTimerTick() {
        this.initialTime--; // Decrement the time

        // Update the text display
        this.timerText?.setText(`${this.initialTime}`);

        // Check if the countdown has reached zero
        if (this.initialTime <= 0) {
            this.timerEvent.destroy(); // Stop the timer
            this.timerText?.setText('Time\'s Up!'); // Display a final message
        }
    }


    update(){
        //dev scene reset
        this.timerBar.update();
        if (!this.cursors){
			return
		}
        if (this.cursors.shift?.isDown){
			this.scene.restart()
            this.initialTime = 10
            this.canClick = true;
		}

    }
}