BasicGame.Credits = function (game) {
};

BasicGame.Credits.prototype = {
	preload: function() {
	},
	
	create: function() {
		this.game.add.text(0, 0, 'Credits', {font: '65px arial', fill: '#fff'});
		console.log('Credits');
		
		// Back to main menu
		main_menu_button = this.game.add.button(0, 100, 'button', this.backToMainMenu, this, 2, 1, 0);
		main_menu_button_text = 'Back to main menu';
		main_menu_button.addChild(this.game.add.text(0, 0, main_menu_button_text, {font: '20px Arial', fill: '#fff', align: 'center'}));
		
		// Delete saved game
		this.game.deleteSavedState();
	},
	
	update: function() {
	},
	
	backToMainMenu: function() {
		this.game.state.start('MainMenu');
	}
};