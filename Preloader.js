BasicGame.Preloader = function (game) {
};

BasicGame.Preloader.prototype = {
	preload: function() {
		// Preload bar
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.height - 300, 'preloaderBar');
		this.preloadBar.x = this.preloadBar.x - (this.preloadBar.width / 2);
		this.load.setPreloadSprite(this.preloadBar);
		
		// Menus
		this.game.load.image('title_screen', 'assets/title_screen.png');
		this.game.load.image('main_menu_bg', 'assets/main_menu.png');
		this.game.load.image('jump_button', 'assets/main_menu/jumpbutton.png');
		this.game.load.image('jump_button_locked', 'assets/main_menu/jumpbuttonlocked.png');
		this.game.load.image('race_button', 'assets/main_menu/racebutton.png');
		this.game.load.image('race_button_locked', 'assets/main_menu/racebuttonlocked.png');
		this.game.load.image('sidescroll_button', 'assets/main_menu/sidescrollbutton.png');
		this.game.load.image('sidescroll_button_locked', 'assets/main_menu/sidescrollbuttonlocked.png');
		this.game.load.image('boss_button', 'assets/main_menu/bossbutton.png');
		this.game.load.image('boss_button_locked', 'assets/main_menu/bossbuttonlocked.png');
		this.game.load.image('resume_button', 'assets/main_menu/resumebutton.png');
		this.game.load.image('resume_button_locked', 'assets/main_menu/resumegray.png');
		this.game.load.image('story_button', 'assets/main_menu/storybutton.png');
		
		// Backgrounds
		this.game.load.image('bg_shroom', 'assets/backgrounds/bg_shroom_lg.png');
		this.game.load.image('bg_castle', 'assets/backgrounds/bg_castle_lg.png');
		this.game.load.image('bg_grasslands', 'assets/backgrounds/bg_grasslands_lg.png');
		this.game.load.image('bg_green2', 'assets/racing_game/bg_green2.png');
		this.game.load.image('bg_green3', 'assets/racing_game/bg_green3.png');
		this.game.load.image('bg_boss', 'assets/boss_game/bg_boss.png');

		// Instructions
		this.game.load.image('boss_instructions', 'assets/instructions/bossinstructions.png');
		this.game.load.image('jump_instructions', 'assets/instructions/jumpinstructions.png');
		this.game.load.image('race_instructions', 'assets/instructions/raceinstructions.png');
		this.game.load.image('scroller_instructions', 'assets/instructions/scrollerinstructions.png');
		this.game.load.image('score_board', 'assets/score_board.png');
		
		// User interfaces
		this.game.load.spritesheet('button', 'assets/buttons.png', 193, 71);
		this.game.load.spritesheet('answer_button_bg', 'assets/answer_button_background.png', 72, 72);
		this.game.load.atlasXML('buttons', 'assets/ui/blueSheet.png', 'assets/ui/blueSheet.xml');
		this.game.load.atlasXML('green_buttons', 'assets/ui/greenSheet.png', 'assets/ui/greenSheet.xml');
		this.game.load.atlasXML('yellow_buttons', 'assets/ui/yellowSheet.png', 'assets/ui/yellowSheet.xml');
		this.game.load.image('pause_icon', 'assets/ui/pause_icon.png');
		this.game.load.image('black_screen', 'assets/black.png');
		this.game.load.image('white_screen', 'assets/white_screen.png');
		
		// Player sprites
		this.game.load.atlasXML('zizo', 'assets/aliens/alienGreen.png', 'assets/aliens/alienGreen.xml');
		this.game.load.atlasXML('addi', 'assets/aliens/alienPink.png', 'assets/aliens/alienPink.xml');
		this.game.load.atlasXML('alienBeige', 'assets/aliens/alienBeige.png', 'assets/aliens/alienBeige.xml');
		this.game.load.atlasXML('alienBlue', 'assets/aliens/alienBlue.png', 'assets/aliens/alienBlue.xml');
		this.game.load.atlasXML('alienYellow', 'assets/aliens/alienYellow.png', 'assets/aliens/alienYellow.xml');
		this.game.load.atlasXML('enemies', 'assets/side_scroller/enemies.png', 'assets/side_scroller/enemies.xml');
		this.game.load.atlasXML('items', 'assets/side_scroller/items_spritesheet.png', 'assets/side_scroller/items_spritesheet.xml');
		this.game.load.spritesheet('other_items', 'assets/side_scroller/other_items.png', 70, 69);
		this.game.load.image('door1', 'assets/door_openTop.png');
		this.game.load.image('door2', 'assets/door_openMid.png');
		this.game.load.spritesheet('km', 'assets/aliens/km.png', 75, 98);
		
		// Tilesets
		this.game.load.image('base_tileset', 'assets/tiles_spritesheet2.png');
		
		// Audio
		this.game.load.audio('racing_background_music', 'assets/racing_game/34_Chariot - Stage 4.mp3');
		this.game.load.audio('scroller_background_music', 'assets/side_scroller/Decktonic_-_09_-_Night_Drive.ogg');
		this.game.load.audio('splat_sound', 'assets/common_sounds/87535__flasher21__splat.wav');
		this.game.load.audio('win_sound', 'assets/common_sounds/Kids Cheering-SoundBible.com-681813822.mp3');
		this.game.load.audio('lose_sound', 'assets/common_sounds/Sad-Trombone.mp3');
		this.game.load.audio('right_answer_sound', 'assets/common_sounds/right_answer_ding.mp3');
		this.game.load.audio('wrong_answer_sound', 'assets/common_sounds/Banana Peel Slip Zip-SoundBible.com-803276918.mp3');
		this.game.load.audio('boss_background_music', 'assets/boss_game/Battle_Special.mp3');
	
		// Story Opener files
		this.game.load.image('cutscene_opener_bg', 'assets/cutscenes/open/bg_scene1.png');
		this.game.load.image('cutscene_opener_addi_1', 'assets/cutscenes/open/addi_dialogue_0.png');
		this.game.load.image('cutscene_opener_big_tree', 'assets/cutscenes/open/bigtree.png');
		this.game.load.image('cutscene_opener_km_new', 'assets/cutscenes/open/km_new.png');
		this.game.load.image('cutscene_opener_km_2', 'assets/cutscenes/open/km_new_2.png');
		this.game.load.image('cutscene_opener_km_positive', 'assets/cutscenes/open/km_positive.png');
		this.game.load.image('cutscene_opener_zizo_1', 'assets/cutscenes/open/zizo_dialogue_1.png');
		this.game.load.image('cutscene_opener_zizo_2', 'assets/cutscenes/open/zizo_dialogue_2.png');
		this.game.load.image('cutscene_opener_zizo_3', 'assets/cutscenes/open/z_youwont.png');
		this.game.load.image('cutscene_opener_zizo_stronghold', 'assets/cutscenes/open/z_subtraction.png');
		this.game.load.image('cutscene_opener_zizo_hmwhatsthis', 'assets/cutscenes/open/z_hmwhatsthis.png');
		this.game.load.image('cutscene_opener_zizo_million', 'assets/cutscenes/open/z_million.png');
		this.game.load.image('cutscene_opener_zizo_perfect', 'assets/cutscenes/open/z_perf.png');
		this.game.load.image('cutscene_opener_newspaper', 'assets/cutscenes/open/newspaper.png');
		this.game.load.image('cutscene_opener_newspaper2', 'assets/cutscenes/open/newspaper2.png');
		this.game.load.audio('story_Addi8+5', 'assets/cutscenes/open/Addi8+5.mp3');
		this.game.load.audio('story_AddiNo', 'assets/cutscenes/open/AddiNo.mp3');
		this.game.load.audio('story_KmAreYouPositive', 'assets/cutscenes/open/KmAreYouPositive.mp3');
		this.game.load.audio('story_KmPlusPlusPlus', 'assets/cutscenes/open/KmPlusPlusPlus.mp3');
		this.game.load.audio('story_KmZizoMyBoy', 'assets/cutscenes/open/KmZizoMyBoy.mp3');
		this.game.load.audio('story_NButLittleDoTheyKnow', 'assets/cutscenes/open/NButLittleDoTheyKnow.mp3');
		this.game.load.audio('story_NOurStoryBegins', 'assets/cutscenes/open/NOurStoryBegins.ogg');
		this.game.load.audio('story_NOurHeroZizo', 'assets/cutscenes/open/NOurHeroZizo.ogg');
		this.game.load.audio('story_Z4+7', 'assets/cutscenes/open/Z4+7.ogg');
		this.game.load.audio('story_Zperfect', 'assets/cutscenes/open/Zperfect.ogg');
		this.game.load.audio('story_Zsubstrong', 'assets/cutscenes/open/Zsubstrong.ogg');
		this.game.load.audio('story_Zwontgetaway', 'assets/cutscenes/open/Zwontgetaway.ogg');
		this.game.load.audio('story_Zwhatdo', 'assets/cutscenes/open/Zwhatdo.ogg');
		this.game.load.audio('story_Zwhatsthis', 'assets/cutscenes/open/Zwhatsthis.ogg');
		this.game.load.audio('story_Zmillionmiles', 'assets/cutscenes/open/Zmillionmiles.ogg');
		this.game.load.audio('story_swish', 'assets/cutscenes/open/swish.ogg');
		this.game.load.audio('story_wind', 'assets/cutscenes/open/wind.ogg');
	},
	
	create: function() {
		text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Loading screen', {font: '65px Arial', fill: '#fff'});
		text.anchor.setTo(0.5, 0.5);
		
		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
		
		
		
		this.game.state.start('TitleScreen');
		// this.game.state.start('MainMenu');
		// this.game.state.start('SideScrollerGame');
		// this.game.state.start('HorseGame');
		// this.game.state.start('PlatformGame');
		// this.game.state.start('StoryOpen');
	}
};