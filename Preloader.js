BasicGame.Preloader = function (game) {
};

BasicGame.Preloader.prototype = {
	preload: function() {
		// Preload bar
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.height - 300, 'preloaderBar');
		this.preloadBar.x = this.preloadBar.x - (this.preloadBar.width / 2);
		this.load.setPreloadSprite(this.preloadBar);
		
		// Backgrounds
		this.game.load.image('bg_shroom', 'assets/backgrounds/bg_shroom_lg.png');
		this.game.load.image('bg_castle', 'assets/backgrounds/bg_castle_lg.png');
		this.game.load.image('bg_grasslands', 'assets/backgrounds/bg_grasslands_lg.png');
		
		// User interfaces
		this.game.load.spritesheet('button', 'assets/buttons.png', 193, 71);
		this.game.load.spritesheet('answer_button_bg', 'assets/answer_button_background.png', 72, 72);
		this.game.load.atlasXML('buttons', 'assets/ui/blueSheet.png', 'assets/ui/blueSheet.xml');
		this.game.load.atlasXML('green_buttons', 'assets/ui/greenSheet.png', 'assets/ui/greenSheet.xml');
		this.game.load.atlasXML('yellow_buttons', 'assets/ui/yellowSheet.png', 'assets/ui/yellowSheet.xml');
		this.game.load.image('pause_icon', 'assets/ui/pause_icon.png');
		
		// Player sprites
		this.game.load.atlasXML('zizo', 'assets/aliens/alienGreen.png', 'assets/aliens/alienGreen.xml');
		this.game.load.atlasXML('addi', 'assets/aliens/alienPink.png', 'assets/aliens/alienPink.xml');
		this.game.load.atlasXML('alienBeige', 'assets/aliens/alienBeige.png', 'assets/aliens/alienBeige.xml');
		this.game.load.atlasXML('alienBlue', 'assets/aliens/alienBlue.png', 'assets/aliens/alienBlue.xml');
		this.game.load.atlasXML('alienYellow', 'assets/aliens/alienYellow.png', 'assets/aliens/alienYellow.xml');
		
		// Tilesets
		this.game.load.image('base_tileset', 'assets/tiles_spritesheet.png');
		
		// Audio
		this.game.load.audio('racing_background_music', 'assets/racing_game/34_Chariot - Stage 4.mp3');
		this.game.load.audio('win_sound', 'assets/common_sounds/Kids Cheering-SoundBible.com-681813822.mp3');
		this.game.load.audio('lose_sound', 'assets/common_sounds/Sad-Trombone.mp3');
		this.game.load.audio('right_answer_sound', 'assets/common_sounds/right_answer_ding.mp3');
		this.game.load.audio('wrong_answer_sound', 'assets/common_sounds/Banana Peel Slip Zip-SoundBible.com-803276918.mp3');
	},
	
	create: function() {
		text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Loading screen', {font: '65px Arial', fill: '#fff'});
		text.anchor.setTo(0.5, 0.5);
		
		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
		
		// this.game.state.start('TitleScreen');
		// this.game.state.start('SideScrollerGame');
		// this.game.state.start('HorseGame');
		this.game.state.start('PlatformGame');
	}
};