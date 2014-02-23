BasicGame.Preloader = function (game) {
};

BasicGame.Preloader.prototype = {
	preload: function() {
		// Preload bar
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.height - 300, 'preloaderBar');
		this.preloadBar.x = this.preloadBar.x - (this.preloadBar.width / 2);
		this.load.setPreloadSprite(this.preloadBar);
		
		// Backgrounds
		this.game.load.image('bg_shroom', 'assets/backgrounds/bg_shroom.png');
		this.game.load.image('bg_castle', 'assets/backgrounds/bg_castle.png');
		this.game.load.image('bg_grasslands', 'assets/backgrounds/bg_grasslands.png');
		
		// Sprites
		this.game.load.spritesheet('button', 'assets/buttons.png', 193, 71);
		this.game.load.spritesheet('answer_button_bg', 'assets/answer_button_background.png', 72, 72);
	},
	
	create: function() {
		text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Loading screen', {font: '65px Arial', fill: '#fff'});
		text.anchor.setTo(0.5, 0.5);
		
		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
		
		this.game.state.start('TitleScreen');
		// $.cookie('saved_level', '1');
	},
	
	update: function() {
	}
};