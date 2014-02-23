BasicGame.PlatformGame = function (game) {
	this.state_label = 'PlatformGame';
};

BasicGame.PlatformGame.prototype = {
	preload: function() {
	},
	
	create: function() {
		this.game.add.text(0, 0, 'Platform game', {font: '65px arial', fill: '#fff'});
		console.log('Platform game');
		this.game.input.onDown.add(this.winGame, this);
	},
	
	update: function() {
	},
	
	winGame: function() {
		console.log('Won platform game!');
		this.game.goToNextState.call(this);
	}
};