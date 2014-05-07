BasicGame.PlatformGame = function (game) {
	this.state_label = 'PlatformGame';
	this.currentlevel= 1;
	this.level_images = [];
	
	this.level_images[1] = {
		'background': 'bg_grasslands',
		'tilemap': 'level_1',
		'tileset': 'base_tileset'
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
	
	this.started = false;
	
	this.answer_button_group = null;
	this.ui_layer = null;
		
	this.starting_line_position = 150;
	this.min_player_speed = 15;
	
	this.zizo = null;
	this.finish_line = null;
	this.end_text = null;
	
	this.win_sound = null;
	this.lose_sound = null;
	this.right_answer_sound = null;
	this.wrong_answer_sound = null;

	
	this.level_text = null;
	this.background = null;
	this.tilemap = null;
	this.tileset = null;
	
	this.problem_text = null;
	this.answer = 0;
	this.zizo = null;
	
	this.background_music = null;
};

BasicGame.PlatformGame.prototype = {
	preload: function() {
		this.game.load.tilemap('level_1', 'assets/platform_game/level_1.json', null, Phaser.Tilemap.TILED_JSON);
		this.background_music = this.game.add.audio('platform_background_music');
		this.game.load.audio('platform_background_music', 'assets/platform_game/Def Leppard - Pour Some Sugar On Me.mp3');
		//this.win_sound = this.game.add.audio('win_sound');
		//this.lose_sound = this.game.add.audio('lose_sound');
		//this.right_answer_sound = this.game.add.audio('right_answer_sound');
		//this.wrong_answer_sound = this.game.add.audio('wrong_answer_sound');
		
	      
	},
	
	create: function() {
	
	// Answer button group
	this.answer_button_group = this.game.createAnswerButtons.call(this);
	this.answer_button_group.z = 1;
	// Pause button / ui group
	this.ui_layer = this.game.add.group();
	this.ui_layer.z = 2;
		
	this.pause_button = this.game.add.button(this.game.world.width - 135, 20, 'pause_icon', this.game.pause, this);
	this.ui_layer.add(this.pause_button);
		
		
	this.game.world.setBounds(0, 0, 1280, 4320);
	this.game.camera.y = this.game.world.height;
	
	// Finish line
	this.finish_line = this.game.add.sprite(this.game.world.width - 115, this.game.world.height - 25, 'finish_line');
	this.finish_line.anchor.setTo(0, 1);
	
		
	this.startLevel();
	//this.game.input.onDown.add(this.winGame, this);
 
	},
	
	startLevel: function() {
	this.current_level = 1;
		if (this.game.global_vars.load_saved_state) {
				this.current_level = this.game.global_vars.saved_level;
				this.game.global_vars.load_saved_state = false;
		}
	
		this.background_music.play();
		//this.background = this.game.add.sprite(0, 0, this.level_images[this.current_level]['background']);
		//this.background.fixedToCamera = true;
		
		this.level_text = this.game.add.text(80, 10, 'Level ' + this.current_level, {font: '20px kenvector_future', fill: '#fff'});
		this.level_text.fixedToCamera = true;
		
		
		
		// Create Zizo
		this.zizo = this.game.add.sprite(100, this.game.world.height - 70, 'zizo');
		this.zizo.anchor.setTo(1, 1);
		this.zizo.animations.add('wait', [0], 1, false);
		this.zizo.animations.add('on_mark', [6], 1, false);
		this.zizo.animations.add('get_set', [3], 1, false);
		this.zizo.animations.add('run', [9, 10], 5, true);
		this.zizo.play('wait');
		this.zizo.body.velocity.x = 0;
		this.zizo.body.velocity.y = -200;
		
		this.game.camera.follow(this.zizo);
		
		// Reset 
		this.reset();
		
		this.start_button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'yellow_buttons', this.startCountDown, this, 3, 3, 4);
		this.start_button.anchor.setTo(0.5, 0.5);
		this.start_text = this.game.add.text(0, 0, 'Click to start!', {font: '12pt kenvector_future', fill: '#fff', align: 'center'});
		this.start_text.anchor.setTo(0.5, 0.5);
		this.start_button.addChild(this.start_text);
		
	},
	
	pause: function() {
		this.background_music.pause();
	},
	
	unpause: function() {
	if (!this.started) {
			return;
	}
		this.background_music.resume();
	},
	
	update: function() {
	this.game.physics.overlap(this.zizo, this.finish_line, this.winGame, null, this);
	this.game.physics.overlap(this.opponents, this.finish_line, this.loseGame, null, this);
		    
	},
	reset: function() {
		if (this.end_text != null && this.end_text.exists) {
			this.end_text.destroy();
		}
		
		this.zizo.x = this.starting_line_position;
		this.zizo.play('wait');
		this.zizo.body.velocity.x = 0;
		
		this.background_music.stop();
	},

	
	
	startCountDown: function() {
		this.start_button.destroy();
		
		this.background_music.play();
		
		var this_ref = this;
		var count_down_text = this.game.add.text(this.game.world.centerX, 40, 'On your mark...', this.text_style);
		count_down_text.anchor.setTo(0.5, 0.5);
		
		this.zizo.play('on_mark');
		this.opponents.callAll('play', null, 'on_mark');
		
		setTimeout(function(){
			count_down_text.setText('Get set...');
			this_ref.zizo.play('get_set');
			this_ref.opponents.callAll('play', null, 'get_set');
			
			setTimeout(function(){
				count_down_text.setText('GO!!!');
				
				setTimeout(function(){
					count_down_text.destroy();
					this_ref.zizo.play('run');
					this_ref.opponents.callAll('play', null, 'run');
					
					this_ref.startRace.call(this_ref);
				}, 1000);
			}, 1000);
		}, 1000);
	},
	
	displayNewProblem: function() {
		var problem = this.game.getMathProblem('add');
		this.answer = problem.answer;
		
		// if (this.problem_background == null || !this.problem_background.exists) {
			// this.problem_background = this.game.add.graphics(this.game.world.centerX, 200);
			// this.problem_background.anchor.setTo(0.5, 0.5);
			// this.problem_background.lineStyle(2, 0x0000FF, 0.5);
			// this.problem_background.beginFill(0x0000FF, 0.5);
			// this.problem_background.drawRect(0, 0, 500, 250);
		// }
		
		if (this.problem_text == null || !this.problem_text.exists) {
			this.problem_text = this.game.add.text(this.game.world.centerX, 50, problem.text, {font: '65px kenvector_future', fill: '#fff'});
			this.problem_text.anchor.setTo(0.5, 0.5);
		} else {
			this.problem_text.setText(problem.text);
		}
	},
	
	checkAnswer: function(answer) {
		if (this.answer == answer) {
			this.right_answer_sound.play();
			this.displayNewProblem();
		} else {
			this.wrong_answer_sound.play();
		}
	},
	
	winGame: function() {
		console.log('Won platform game!');
		if (!this.started) {
			return;
		}
		this.win_sound.play();
		this.end_text = this.game.add.text(this.game.world.centerX, 40, 'You win!', this.text_style);
		this.end_text.anchor.setTo(0.5, 0);
		
		this.game.input.onDown.addOnce(this.finishLevel, this);
		
		this.current_level = 1;
		
		// Unlock this mini game
		this.game.unlockMiniGame(this.state_label);
		
		this.game.goToNextState.call(this);
	}
	
	/*loseGame: function() {
		if (!this.started) {
			return;
		}
		this.endGame();
		this.lose_sound.play();
		this.end_text = this.game.add.text(this.game.world.centerX, 40, 'You lose :( Try again!', this.text_style);
		this.end_text.anchor.setTo(0.5, 0);
		
		this.game.input.onDown.addOnce(this.startLevel, this);
	},
	
	endGame: function() {
		this.started = false;
		this.problem_text.destroy();
		
		this.zizo.body.velocity.x = 0;
		this.zizo.animations.play('wait');
			
		this.background_music.stop();
	},
	
	finishLevel: function() {
		this.background_layer.remove(this.background);
		this.level_text.destroy();
		
		if (this.current_level < 3) {
			this.current_level += 1;
			
			this.game.saveGame(this.state_label, this.current_level);
			
			this.startLevel();
		} else {
			this.winGame();
		}
	},
	
	shutdown: function() {
		console.log('shutdown');
		console.log(this.zizo.body.velocity.x);
		
		this.zizo.body.velocity.x = 0;
		console.log(this.zizo.body.velocity.x);
	}*/

};
