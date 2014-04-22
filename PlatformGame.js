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
	
	this.level_text = null;
	this.background = null;
	this.tilemap = null;
	this.tileset = null;
	
	this.problem_text = null;
	this.answer = 0;
	this.zizo = null;
};

BasicGame.PlatformGame.prototype = {
	preload: function() {
		this.game.load.tilemap('level_1', 'assets/platform_game/level_1.json', null, Phaser.Tilemap.TILED_JSON);
	      // this.game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
          // this.game.load.tileset('tiles', 'assets/level.png', 16, 16);
	},
	
	create: function() {
		this.game.world.setBounds(0, 0, 1280, 4320);
		this.game.camera.y = this.game.world.height;
		
		
		// this.game.add.text(0, 0, 'Platform game', {font: '65px arial', fill: '#fff'});
		// console.log('Platform game');
		// this.game.input.onDown.add(this.winGame, this);
		// this.game.stage.backgroundColor = '#FFFFFF';
        // map = this.game.add.tilemap('map');
        // tileset = this.game.add.tileset('tiles'); 
        // tileset.setCollisionRange(0, tileset.total - 1, true, true, true, true);
        // layer = this.game.add.tilemapLayer(0, 0, 240, 128, tileset, map, 0);
        // layer.resizeWorld();
        // player = this.game.add.sprite(2 * 16, 6 * 16, 'character');
        // player.body.bounce.y = 0.1;
        // player.body.gravity.y = 6;
        // this.game.camera.follow(player);
        // cursors = this.game.input.keyboard.createCursorKeys();
        // jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		this.startLevel();
 
	},
	
	update: function() {
	
	    // this.game.physics.collide(player, layer);
        // player.body.velocity.x = 0;
 
        // if (cursors.left.isDown)
          // {
            // player.body.velocity.x = -hozMove;
 
            // if (facing !== "left")
            // {
              // facing = "left";
            // }
          // }
          // else if (cursors.right.isDown)
          // {
            // player.body.velocity.x = hozMove;
            
            // if (facing !== "right")
            // {
                // facing = "right";
            // }
          // }
          
          
          // if (jumpButton.isDown && player.body.touching.down && this.game.time.now > jumpTimer)
          // {
            // player.body.velocity.y = vertMove;
            // jumpTimer = this.game.time.now + 650;
          // }
 
          
          // if (facing === "left") {
          
            // player.frame = 1;
          // } else {
            // player.frame = 0;
          // }
 
        // }
	},
	
	// ***** Added this, see my code for the racing game to get an idea of what needs to be done *****/
	startLevel: function() {
		this.current_level = 1;
		
		this.background = this.game.add.sprite(0, 0, this.level_images[this.current_level]['background']);
		this.background.fixedToCamera = true;
		
		this.level_text = this.game.add.text(80, 10, 'Level ' + this.current_level, {font: '20px kenvector_future', fill: '#fff'});
		this.level_text.fixedToCamera = true;
		
		this.tilemap = this.game.add.tilemap(this.level_images[this.current_level]['tilemap']);
		this.tileset = this.tilemap.addTilesetImage('base_tileset', 'base_tileset');
		this.layer = this.tilemap.createLayer('Tile Layer 1');
		this.layer.resizeWorld();
		
		// Create Zizo
		this.zizo = this.game.add.sprite(100, this.game.world.height - 70, 'zizo');
		this.zizo.anchor.setTo(1, 1);
		this.zizo.body.velocity.y = -200;
		
		this.game.camera.follow(this.zizo);
	},
	
	winGame: function() {
		/*console.log('Won platform game!');
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
			answer_button.addChild(answer_button_text);
			
			this.answer_button_group.add(answer_button);
		}
		
		this.startLevel();
	}, // ***** YOU'RE MISSING SOMETHING HERE ***** //
		//this.game.goToNextState.call(this);*/
	}
};
