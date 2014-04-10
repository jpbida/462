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
	
	this.text_style = {font: '65px kenvector_future', fill: 'white', align: 'center'};
	
	this.level_text = null;
	this.background = null;
	this.tilemap = null;
	this.tileset = null;
	
	this.started = false;
	
	this.background_layer = null;
	this.answer_button_group = null;
	this.ui_layer = null;
	this.problem_text = null;
	this.answer = 0;
	
	this.starting_line_position = 150;
	this.min_player_speed = 15;
	// this.min_player_speed = 100;
	this.player_run_timer = 0;
	this.min_opponent_speed = 20;
	this.max_opponent_speed = 50;
	this.move_opponent_timer = 0;
	
	this.zizo = null;
	this.opponents = null;
	this.finish_line = null;
	this.end_text = null;
	
	this.background_music = null;
	this.win_sound = null;
	this.lose_sound = null;
	this.right_answer_sound = null;
	this.wrong_answer_sound = null;
};

BasicGame.HorseGame.prototype = {
	preload: function() {
		// Finish line
		this.game.load.image('finish_line', 'assets/racing_game/finish_line.png');
	},
	
	create: function() {
		console.log('Horse game');
		
		// Audio
		this.background_music = this.game.add.audio('racing_background_music');
		this.win_sound = this.game.add.audio('win_sound');
		this.lose_sound = this.game.add.audio('lose_sound');
		this.right_answer_sound = this.game.add.audio('right_answer_sound');
		this.wrong_answer_sound = this.game.add.audio('wrong_answer_sound');
			
		// Manage Layers
		this.background_layer = this.game.add.group();
		this.background_layer.z = 0;
		
		// Answer button group
		this.answer_button_group = this.game.createAnswerButtons.call(this);
		this.answer_button_group.z = 1;
		
		// Pause button / ui group
		this.ui_layer = this.game.add.group();
		this.ui_layer.z = 2;
		
		this.pause_button = this.game.add.button(this.game.world.width - 135, 20, 'pause_icon', this.game.pause, this);
		this.ui_layer.add(this.pause_button);
		
		// Create Opponents
		this.opponents = this.game.add.group();
		var opponent_sprites = ['alienBeige', 'alienBlue', 'alienYellow'];
		for (var i = 0; i < opponent_sprites.length; i++) {
			var opponent = this.opponents.create(this.starting_line_position, this.game.world.height - (90 * i) - 115, opponent_sprites[i]);
			opponent.anchor.setTo(1, 1);
			opponent.animations.add('wait', [0], 1, false);
			opponent.animations.add('on_mark', [6], 1, false);
			opponent.animations.add('get_set', [3], 1, false);
			opponent.animations.add('run', [9, 10], 5, true);
			opponent.play('wait');
			opponent.body.velocity.x = 0;
		}		
		this.opponents.sort('y', Phaser.Group.SORT_ASCENDING);
		
		// Create Zizo
		this.zizo = this.game.add.sprite(this.starting_line_position, this.game.world.height - 25, 'zizo');
		this.zizo.anchor.setTo(1, 1);
		this.zizo.animations.add('wait', [0], 1, false);
		this.zizo.animations.add('on_mark', [6], 1, false);
		this.zizo.animations.add('get_set', [3], 1, false);
		this.zizo.animations.add('run', [9, 10], 5, true);
		this.zizo.play('wait');
		this.zizo.body.velocity.x = 0;
		
		console.log('create');
		console.log(this.zizo.body.velocity.x);
		
		// Finish line
		this.finish_line = this.game.add.sprite(this.game.world.width - 115, this.game.world.height - 25, 'finish_line');
		this.finish_line.anchor.setTo(0, 1);
		
		this.startLevel();
	},
	
	pause: function() {
		this.background_music.pause();
	},
	
	unpause: function() {
		this.background_music.resume();
	},
	
	update: function() {
		if (!this.started) {
			return;
		}
		
		this.game.physics.overlap(this.zizo, this.finish_line, this.winRace, null, this);
		this.game.physics.overlap(this.opponents, this.finish_line, this.loseRace, null, this);
		
		// If player has not answered in 30 seconds
		if (this.started && this.game.time.now - this.player_run_timer > 3000) {
			this.slowPlayer();
		}
		
		// After 30 seconds, randomize opponents' speeds
		if (this.started && this.game.time.now - this.move_opponent_timer > 3000) {
			this.moveOpponents();
		}
	},
	
	reset: function() {
		if (this.end_text != null && this.end_text.exists) {
			this.end_text.destroy();
		}
		
		this.zizo.x = this.starting_line_position;
		this.zizo.play('wait');
		this.zizo.body.velocity.x = 0;
		
		this.opponents.setAll('x', this.starting_line_position);
		this.opponents.setAll('body.velocity.x', 0);
		this.opponents.callAll('play', null, 'wait');
		
		this.background_music.stop();
	},
	
	startLevel: function() {
		if (this.game.global_vars.load_saved_state) {
			this.current_level = this.game.global_vars.saved_level;
			this.game.global_vars.load_saved_state = false;
		}
		
		// Load level specific things
		this.background = this.game.add.sprite(0, 0, this.level_images[this.current_level]['background']);
		this.background_layer.add(this.background);
		this.level_text = this.game.add.text(80, 10, 'Level ' + this.current_level, {font: '20px kenvector_future', fill: '#fff'});
		
		// Reset characters
		this.reset();
		
		this.start_button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'yellow_buttons', this.startCountDown, this, 3, 3, 4);
		this.start_button.anchor.setTo(0.5, 0.5);
		this.start_text = this.game.add.text(0, 0, 'Click to start!', {font: '12pt kenvector_future', fill: '#fff', align: 'center'});
		this.start_text.anchor.setTo(0.5, 0.5);
		this.start_button.addChild(this.start_text);
		
		// this.game.input.onDown.addOnce(this.startCountDown, this);
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
	
	startRace: function() {
		this.started = true;
		this.displayNewProblem();
		
		this.zizo.body.velocity.x = this.min_player_speed;
		this.moveOpponents.call(this);
	},
	
	moveOpponents: function() {
		var this_ref = this;
		this.move_opponent_timer = this.game.time.now;
		
		this.opponents.forEach(function(opponent){ 
			var speed = this_ref.game.randomIntFromInterval(this_ref.min_opponent_speed, this_ref.max_opponent_speed);
			opponent.body.velocity.x = speed;
		});
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
			this.acceleratePlayer();
		} else {
			this.wrong_answer_sound.play();
		}
	},
	
	acceleratePlayer: function() {
		if (this.started) {
			console.log('accelerate');
			this.zizo.body.velocity.x += 15;
			this.player_run_timer = this.game.time.now;
		}
	},
	
	slowPlayer: function() {
		if (this.started) {
			console.log('deccelerate');
			this.player_run_timer = this.game.time.now;
			if (this.zizo.body.velocity.x > this.zizo.body.velocity.x + 14) {
				this.zizo.body.velocity.x -= 15;
			} else {
				this.zizo.body.velocity.x = this.min_player_speed;
			}
		}
	},
	
	winRace: function() {
		if (!this.started) {
			return;
		}
		
		this.endRace();
		this.win_sound.play();
		this.end_text = this.game.add.text(this.game.world.centerX, 40, 'You win!', this.text_style);
		this.end_text.anchor.setTo(0.5, 0);
		
		this.game.input.onDown.addOnce(this.finishLevel, this);
	},
	
	loseRace: function() {
		if (!this.started) {
			return;
		}
		
		this.endRace();
		this.lose_sound.play();
		this.end_text = this.game.add.text(this.game.world.centerX, 40, 'You lose :( Try again!', this.text_style);
		this.end_text.anchor.setTo(0.5, 0);
		
		this.game.input.onDown.addOnce(this.startLevel, this);
	},
	
	endRace: function() {
		this.started = false;
		this.problem_text.destroy();
		
		this.zizo.body.velocity.x = 0;
		this.zizo.animations.play('wait');
		this.opponents.setAll('body.velocity.x', 0);
		this.opponents.callAll('play', null, 'wait');
		
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
	
	winGame: function() {
		console.log('Won horse game!');
		this.current_level = 1;
		
		// Unlock this mini game
		this.game.unlockMiniGame(this.state_label);
		
		this.game.goToNextState.call(this);
	},
	
	shutdown: function() {
		console.log('shutdown');
		console.log(this.zizo.body.velocity.x);
		// this.background_layer.destroy();
		// this.answer_button_group.destory();
		// this.ui_layer.destroy();
		// this.zizo.destroy();
		// this.opponents.destroy();
		// this.finish_line.destroy();
		this.zizo.body.velocity.x = 0;
		this.opponents.setAll('body.velocity.x', 0);
		console.log(this.zizo.body.velocity.x);
	}
};