var config = {
    type: Phaser.AUTO,
    parent: 'pegas-universe',
    width: 1024,
    height: 768,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    transparent: true
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('buttonPause', 'assets/pause_icon_0.png');
}

function create() {
    time = this.add.text(16, 16, 'time: 0', { fontSize: '32px', fill: '#000' });
    score = this.add.text(16, 50, 'score: 0', { fontSize: '32px', fill: '#000' });
    scoreNow = 0;

    paused = false;
    var buttonPause = this.add.sprite(48, 122, 'buttonPause').setInteractive();
    buttonPause.on('pointerdown', pauseGame, this); 
    buttonPause.on('pointerup', resumeGame, this); 

    this.time.addEvent({delay: 500, loop: true, callback: updateScene})

}

function update() {
    time.setText("time: " + this.time.now);
}

function updateScene() {
    scoreNow ++;
    score.setText("score: " + scoreNow);
}

function pauseGame() {
    paused = true;
    this.scene.pause();
}

function resumeGame() {
    paused = false;
    this.scene.resume();
}
