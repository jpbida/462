/* Scene #1 -- story introduction, before first mini game */
BasicGame.StoryScene1 = function (game) {
	this.state_label = 'StoryScene1';
};

BasicGame.StoryScene1.prototype = {
	preload: function() {
	},
	
	create: function() {
		this.game.add.text(0, 0, 'Story scene #1 -- intro before game #1', {font: '65px arial', fill: '#fff'});
		console.log('story scene #1');
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