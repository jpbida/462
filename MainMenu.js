BasicGame.MainMenu = function (game) {
};

BasicGame.MainMenu.prototype = {
	preload: function() {
	},
	
	create: function() {
		console.log('Main Menu');
		console.log('Overall score = ' + this.game.global_vars.player_overall_score);
		
		this.game.add.text(0, 0, 'Main menu', {fill: '#fff', font: '65px arial', align: 'center'});
		
		// Load game button
		button_offset = 0;
		if ($.cookie('saved_state') != null && $.cookie('saved_state') != '') {
			console.log($.cookie('saved_state'));	
			button_offset = 100;
			load_game_button = this.game.add.button(0, 100, 'button', this.loadSavedState, this, 2, 1, 0);
			load_game_button_text = this.game.add.text(0, 0, 'Load saved game', {font: '20px Arial', fill: '#fff', align: 'center'});
			load_game_button.addChild(load_game_button_text);
		} else {
			console.log(this.game.global_vars.saved_state);
		}
		
		// Start new story mode
		story_mode_button = this.game.add.button(0, button_offset + 100, 'button', this.startStoryMode, this, 2, 1, 0);
		if (this.game.global_vars.saved_state == '') {
			story_mode_button_text = 'Start story mode!';
		} else {
			story_mode_button_text = 'Restart story mode!';
		}
		story_mode_button.addChild(this.game.add.text(0, 0, story_mode_button_text, {font: '20px Arial', fill: '#fff', align: 'center'}));
		
		// Mini game buttons
		for (var i = 0; i < 3; i++) {
		}
	},
	
	update: function() {
	},
	
	startStoryMode: function() {
		this.game.deleteSavedState();
		
		this.game.global_vars.story_mode = true;
		this.game.state.start(this.game.story_mode_state_order[0]);
	},
	
	loadSavedState: function() {
		this.game.global_vars.story_mode = true;
		this.game.global_vars.load_saved_state = true;
		this.game.global_vars.saved_state = $.cookie('saved_state');
		this.game.global_vars.saved_level = parseInt($.cookie('saved_level'));
		
		console.log('Load saved state');
		console.log('- saved state: ' + this.game.global_vars.saved_state);
		console.log('- saved level: ' + this.game.global_vars.saved_level);
		
		this.game.state.start(this.game.global_vars.saved_state);
	}
};