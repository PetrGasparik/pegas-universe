//necessary things to run the game
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

//my variables
var timer = new Map();

function preload() {
    this.load.image('buttonPause', 'assets/pause_icon_0.png');
}

function create() {
    //counters
    peopleNow = 0;
    rolesNow = 0;
    systemsNow = 0;

    //timers for counters
    timer.set('time', this.time.addEvent({
        delay: 100,                // ms
        callback: updateTime,
        //args: [],
        callbackScope: this,
        loop: true
    }));
    timer.set('people', this.time.addEvent({
        delay: 1000,                // ms
        callback: recomputePeople,
        //args: [],
        callbackScope: this,
        loop: true
    }));
    timer.set('roles', this.time.addEvent({
        delay: 5000,                // ms
        callback: recomputeRoles,
        //args: [],
        callbackScope: this,
        loop: true
    }));
    timer.set('systems', this.time.addEvent({
        delay: 10000,                // ms
        callback: recomputeSystems,
        //args: [],
        callbackScope: this,
        loop: true
    }));

    //labels with counters
    timeLabel = this.add.text(16, 16, 'time: ', { fontSize: '32px', fill: '#000' });
    peopleLabel = this.add.text(16, 50, '', { fontSize: '32px', fill: '#000' });
    rolesLabel = this.add.text(16, 84, '', { fontSize: '32px', fill: '#000' });
    systemsLabel = this.add.text(16, 120, '', { fontSize: '32px', fill: '#000' });

    //buttons
    const buttonStop = this.add.text(16, 200, 'S', { fontSize: '32px', fill: '#000' });;
    const buttonPlay = this.add.text(48, 200, 'P', { fontSize: '32px', fill: '#000' });;
    buttonStop.setInteractive();
    buttonPlay.setInteractive();
    buttonStop.on('pointerup', pauseResumeGame, this);
    buttonPlay.on('pointerup', pauseResumeGame, this);

    //game state
    paused = false;
    gameLabel = this.add.text(16, 234, '', { fontSize: '32px', fill: '#000' });

    updateScene();
    console.log("created");
}

function update() {
    //    timeLabel.setText("time: " + (this.time.now / 1000));
    //time of timer
    //timeLabel.setText("time: " + timer['people'].getElapsed());
}

function updateTime() {
    timeLabel.setText("time: " + Math.round(this.time.now / 100) / 10);
}

function updateScene() {
    peopleLabel.setText("people: " + peopleNow + ", delay: " + Math.round(timer.get('people').delay));
    rolesLabel.setText("roles: " + rolesNow + ", delay: " + Math.round(timer.get('roles').delay));
    systemsLabel.setText("systems: " + systemsNow + ", delay: " + Math.round(timer.get('systems').delay));
    gameLabel.setText("status: " + (paused ? "paused" : "running"));
}

function recomputePeople() {
    peopleNow++;
    timer.get('people').delay /= 1.01;
    //50ms is a limit for us
    if (timer.get('people').delay < 50)
        timer.get('people').delay = 50;
    updateScene();
}

function recomputeRoles() {
    rolesNow++;
    timer.get('roles').delay /= 1.15;
    //50ms is a limit for us
    if (timer.get('roles').delay < 50)
        timer.get('roles').delay = 50;
    updateScene();
}

function recomputeSystems() {
    systemsNow++;
    timer.get('systems').delay /= 1.01;
    //50ms is a limit for us
    if (timer.get('systems').delay < 50)
        timer.get('systems').delay = 50;
    updateScene();
}

function pauseResumeGame() {
    paused = !paused;
    console.log('paused? ' + paused);

    timer.forEach((value, key) => {
        key != 'time' ? value.paused = paused : null;
    });
    
    updateScene();
}
