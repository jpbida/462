BasicGame.TitleScreen = function (game) {
};

BasicGame.TitleScreen.prototype = {
	preload: function() {
	},
	
	create: function() {
		console.log('TitleScreen');
		console.log('Overall score = ' + this.game.global_vars.player_overall_score);
		this.game.global_vars.player_overall_score = 500;
		
		this.game.add.text(0, 0, 'Title Screen', {font: '64px arial', fill: '#fff', align: 'center'});
		
		start_button = this.game.add.button(0, 100, 'button', this.clickStart, this, 2, 1, 0);
		start_button_text = this.game.add.text(0, 0, 'Click to Start!', {font: '20px Arial', fill: '#fff', align: 'center'});
		start_button.addChild(start_button_text);
	},
	
	update: function() {
	},
	
	clickStart: function() {
		this.game.state.start('MainMenu');
	}
};