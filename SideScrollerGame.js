BasicGame.SideScrollerGame = function (game) {
	this.state_label = 'SideScrollerGame';
};

BasicGame.SideScrollerGame.prototype = {
	preload: function() {
	},
	
	create: function() {
		this.game.add.text(0, 0, 'Side scroller', {font: '65px arial', fill: '#fff'});
		console.log('Side scroller game');
		this.game.input.onDown.add(this.winGame, this);
	},
	
	update: function() {
	},
	
	winGame: function() {
		console.log('Won side scroller game!');
		this.game.goToNextState.call(this);
	}
};