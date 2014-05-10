var text_style = {font: '50px kenvector_future', fill: 'black', align: 'left'};

/* Scene #1 -- story introduction, before first mini game */
BasicGame.StoryOpen = function (game) {
	this.state_label = 'StoryOpen';
	this.lines = [];
	this.current_line_index = 0;
	this.current_line = null;
	this.zizo = null;
	this.addi = null;
	this.km = null;
	this.kma = null;
	this.tree = null;
	this.bubble = null;
	this.part_sprites = null;
	this.parts = [];
	this.current_part = 0;
};

BasicGame.StoryOpen.prototype = {
	preload: function() {
	},
	
	create: function() {
		this.game.add.sprite(0, 0, 'cutscene_opener_bg');
		
		this.zizo = this.game.add.sprite(600, 525, 'zizo');
		this.zizo.anchor.setTo(1, 1);
		this.zizo.frame = 6;
		
		this.addi = this.game.add.sprite(700, 525, 'addi');
		this.addi.anchor.setTo(0, 1);
		this.addi.frame = 6;
		this.addi.scale.x = -1;
		
		this.km = this.game.add.sprite(1170, 380, 'km');
		this.km.animations.add('mad', [1], 1, false);
		this.km.anchor.setTo(0, 1);
		this.km.scale.x = -1;
		this.km.angle = 30;
		this.km.frame = 7;
		
		this.tree = this.game.add.sprite(1000, 265, 'cutscene_opener_big_tree');
		
		this.part_sprites = this.game.add.group();
		
		this.parts = this.createParts();
		
		// this.current_part=10;
		this.playNextPart();
	},
	
	narrator: function(string) {
		return this.game.add.text(50, 50, string, text_style);
	},
	
	playLine: function(key) {
		this.current_line = this.game.add.audio(key);
		this.current_line.onStop.add(this.playNextPart, this);
		this.current_line.play();
	},
	
	createParts: function() {
		return [
			'',
			function() {
				this.add_sprite(0, 0, 'white_screen');
				this.part_sprites.add(this.narrator('Our story begins on a bright\n\t\tsummer day in Calculand'));
				this.playLine('story_NOurStoryBegins');
			},
			function() {
				var white = this.add_sprite(0, 0, 'white_screen');
				fade_white = this.game.add.tween(white).to({alpha: 0}, 3000, null, true);
				this.part_sprites.add(this.narrator('Our hero Zizo and his best friend\n\t\t\tAddi are hanging out,\n\t\t\t\t\t\tdoing math problems...'));
				this.playLine('story_NOurHeroZizo');
			},
			function() {		
				this.part_sprites.add(this.game.add.sprite(200, 270, 'cutscene_opener_zizo_1'));
				this.playLine('story_Z4+7');
			},
			function() {
				this.part_sprites.add(this.game.add.sprite(650, 270, 'cutscene_opener_addi_1'));
				this.playLine('story_Addi8+5');
			},
			function() {
				this.part_sprites.add(this.narrator('But little do they know,\n\t\tthey\'re being watched by\n\t\t\t\t\t\tthe evil King Minus'));
				this.playLine('story_NButLittleDoTheyKnow');
			},
			function() {
				this.part_sprites.add(this.game.add.sprite(760, 90, 'cutscene_opener_km_new'));
				this.playLine('story_KmPlusPlusPlus');
			},
			function() {
				var swish = this.game.add.audio('story_swish');
				this.km.frame = 6;
				this.km.angle = 0;
				this.km.bringToTop();
				this.kma = this.game.add.group();
				this.kma.add(this.addi);
				this.kma.add(this.km);
				var km_jump = this.game.add.tween(this.km).to( { x: 750, y: 525 }, 700, Phaser.Easing.Exponential.out, false, 100);
				km_jump.onComplete.add(function(){
					this.km.frame = 3;
					this.km.scale.x = 1;
					this.addi.frame = 4;
					this.addi.scale.x = 1;
					var km_grab = this.game.add.tween(this.kma).to({x: 400}, 500, Phaser.Easing.Exponential.out, false, 100);
					km_grab.onComplete.add(function(){
						this.zizo.frame = 4;
						this.part_sprites.add(this.game.add.sprite(200, 270, 'cutscene_opener_zizo_2'));
						this.playLine('story_Zwhatdo');
					}, this);
					km_grab.start();
					swish.play();
				}, this);
				km_jump.start();
				swish.play();
			},
			function(){
				this.addi.scale.x = -1;
				this.km.scale.x = -1;
				this.km.frame = 0;
				this.km.bringToTop();
				this.add_sprite(650, 150, 'cutscene_opener_km_2');
				this.playLine('story_KmZizoMyBoy');
			},
			function(){
				this.add_sprite(200, 270, 'cutscene_opener_zizo_3');
				this.playLine('story_Zwontgetaway');
			},
			function(){
				this.add_sprite(760, 265, 'cutscene_opener_km_positive');
				this.playLine('story_KmAreYouPositive');
			},
			function(){
				var swish = this.game.add.sound('story_swish');
				var km_leave = this.game.add.tween(this.kma).to({x:1300}, 500, Phaser.Easing.Exponential.out, false);
				km_leave.onComplete.add(this.playNextPart, this);
				km_leave.start();
				swish.play();
			},
			function(){
				this.add_sprite(170, 230, 'cutscene_opener_zizo_stronghold');
				this.playLine('story_Zsubstrong');
			},
			function(){
				this.add_sprite(170, 230, 'cutscene_opener_zizo_million');
				this.playLine('story_Zmillionmiles');
			},
			function(){
				var wind = this.game.add.audio('story_wind');
				var newspaper = this.add_sprite(this.game.world.centerX + 10, 0, 'cutscene_opener_newspaper');
				newspaper.anchor.setTo(0.5, 1);
				var paper_fall = this.game.add.tween(newspaper).to({y: 520}, 2000, Phaser.Easing.Bounce.Out, false);
				paper_fall.onComplete.add(function(){
					this.add_sprite(200, 270, 'cutscene_opener_zizo_hmwhatsthis');
					this.playLine('story_Zwhatsthis');
				}, this);
				paper_fall.start();
				wind.play();
			},
			function(){
				var newspaper = this.add_sprite(this.game.world.centerX, this.game.world.centerY, 'cutscene_opener_newspaper2');
				newspaper.anchor.setTo(0.5, 0.5);
				// this.playLine('story_Znewspaper');
				this.next();
			},
			function(){
				this.zizo.frame = 0;
				this.add_sprite(200, 270, 'cutscene_opener_zizo_perfect');
				this.playLine('story_Zperfect');
			},
			function(){
				var black = this.add_sprite(0, 0, 'black_screen');
				black.alpha = 0;
				var fade_black = this.game.add.tween(black).to({alpha: 1}, 1000, Phaser.Easing.Exponential.out, false);
				fade_black.onComplete.add(this.playNextPart, this);
				fade_black.start();
			}
		];
	},
	
	add_sprite: function(x, y, key) {
		return this.part_sprites.add(this.game.add.sprite(x, y, key));
	},
	
	next: function() {
		this.game.input.onDown.add(this.playNextPart, this);
	},
	
	playNextPart: function() {
		this.removeSprites();
		this.current_part++;
		
		if (this.current_part >= this.parts.length) {
			console.log('here');
			this.game.goToNextState.call(this);
		} else {		
			console.log(this.current_part + ' ' + this.parts.length);
			this.parts[this.current_part].call(this);
		}
	},
	
	removeSprites: function() {
		this.part_sprites.destroy();
		this.part_sprites = this.game.add.group();
	},
	
	playNextLine: function() {
		this.current_line = this.lines[this.current_line_index];
		this.current_line.play();
		this.current_line_index++;
	},
	
	update: function() {
	}
};

/* Scene #1 -- between first and second mini game */
BasicGame.StoryScene1 = function (game) {
	this.state_label = 'StoryScene1';
};

BasicGame.StoryScene1.prototype = {
	preload: function() {
	},
	
	create: function() {
		this.game.add.text(0, 0, 'Story scene #1 -- \nbetween game #1 and game #2', {font: '65px arial', fill: '#fff'});
		console.log('story scene #2');
		this.game.input.onDown.add(this.game.goToNextState, this);
	},
	
	update: function() {
	}
};

/* Scene #2 -- between first and second mini game */
BasicGame.StoryScene2 = function (game) {
	this.state_label = 'StoryScene2';
};

BasicGame.StoryScene2.prototype = {
	preload: function() {
	},
	
	create: function() {
		this.game.add.text(0, 0, 'Story scene #2 -- \nbetween game #1 and game #2', {font: '65px arial', fill: '#fff'});
		console.log('story scene #2');
		this.game.input.onDown.add(this.game.goToNextState, this);
	},
	
	update: function() {
	}
};

/* Scene #3 -- between second and third mini game */
BasicGame.StoryScene3 = function (game) {
	this.state_label = 'StoryScene3';
};

BasicGame.StoryScene3.prototype = {
	preload: function() {
	},
	
	create: function() {
		this.game.add.text(0, 0, 'Story scene #3 -- \nbetween game #2 and game #3', {font: '65px arial', fill: '#fff'});
		console.log('story scene #3');
		this.game.input.onDown.add(this.game.goToNextState, this);
	},
	
	update: function() {
	}
};

/* Scene #4 -- end scene, after last mini game */
BasicGame.StoryScene4 = function (game) {
	this.state_label = 'StoryScene4';
};

BasicGame.StoryScene4.prototype = {
	preload: function() {
	},
	
	create: function() {
		this.game.add.text(0, 0, 'Story scene #4 -- \nend/win scene after game #3', {font: '65px arial', fill: '#fff'});
		console.log('story scene #4');
		this.game.input.onDown.add(this.game.goToNextState, this);
	},
	
	update: function() {
	}
};