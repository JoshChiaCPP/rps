import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'
import characterMenu from './characterMenu'
import minigameRPS from './minigameRPS'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	scale: {
		parent: 'app',
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false //set to true for hitboxes
		},
	},
	scene: [minigameRPS, characterMenu, HelloWorldScene], //characterMenu],
}

export default new Phaser.Game(config)
