BasicGame.HorseGame = function (game) {
	this.state_label = 'HorseGame';
	this.current_level = 1;
	
	this.level_images = [];
	
	this.level_images[1] = {
		'background': 'bg_shroom',
		'tilemap': '',
		'tileset': ''
	};
	
	this.level_images[2] = {
		'background': 'bg_castle',
		'tilemap': '',
		'tileset': ''
	};
	
	this.level_images[3] = {
		'background': 'bg_grasslands',
		'tilemap': '',
		'tileset': ''
	};
	
	this.level_text = null;
	this.background = null;
	this.tilemap = null;
	this.tileset = null;
	
	this.answer_button_group = null;
	this.problem_text = null;
	this.answer = 0;
};

BasicGame.HorseGame.prototype = {
	preload: function() {
	},
	
	create: function() {
		console.log('Horse game');
		
		// Answer button group
		this.answer_button_group = this.game.add.group();
		for (var i = 0; i < 20; i++) {
			// Determine button position
			if (i < 10) {
				answer_button_x = 0;
				answer_button_y = i * 72;
			} else {
				answer_button_x = this.game.world.width - 73;
				answer_button_y = (i - 10) * 72;
			}
			
			value = i + 1;
			var answer_button = this.game.add.button(answer_button_x, answer_button_y, 'answer_button_bg', this.game.answer_buttons[value], this, 0, 0, 1);
			answer_button.value = value;
			
			var answer_button_text = this.game.add.text(0, 0, value, {font: '50px Arial', fill: '#fff', align: 'center'});
			answer_button_text_x = answer_button_x + 36;
			answer_button_text_y = answer_button_y + 36;
			// answer_button_text.anchor.setTo(0.5, 0.5);
			answer_button.addChild(answer_button_text);
			
			this.answer_button_group.add(answer_button);
		}
		
		this.startLevel();
	},
	
	update: function() {
	},
	
	startLevel: function() {
		if (this.game.global_vars.load_saved_state) {
			console.log('start after load');
			this.current_level = this.game.global_vars.saved_level;
			this.game.global_vars.load_saved_state = false;
		}
		
		// Load level specific things
		this.background = this.game.add.sprite(72, 0, this.level_images[this.current_level]['background']);
		this.level_text = this.game.add.text(72, 0, 'Level ' + this.current_level, {font: '65px arial', fill: '#fff'});
		
		console.log('-- Level ' + (this.current_level));
		this.displayNewProblem();
		// this.game.input.onDown.add(this.finishLevel, this);
	},
	
	finishLevel: function() {
		this.level_text.destroy();
		this.problem_text.destroy();
		
		if (this.current_level < 3) {
			this.current_level += 1;
			
			this.game.saveGame(this.state_label, this.current_level);
			
			this.startLevel();
		} else {
			this.winGame();
		}
	},
	
	displayNewProblem: function() {
		var problem = this.game.getMathProblem('add');
		this.answer = problem.answer;
		
		if (this.problem_text == null || !this.problem_text.exists) {
			this.problem_text = this.game.add.text(72, 100, problem.text, {font: '65px Arial', fill: '#fff'});
		} else {
			this.problem_text.setText(problem.text);
		}
	},
	
	checkAnswer: function(answer) {
		console.log('Answer button pressed: ' + answer);
		if (this.answer == answer) {
			// this.displayNewProblem();
			this.finishLevel();
		}
	},
	
	winGame: function() {
		console.log('Won horse game!');
		
		// Unlock this mini game
		this.game.unlockMiniGame(this.state_label);
		
		this.game.goToNextState.call(this);
	}
};