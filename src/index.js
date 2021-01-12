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
var multipliers = new Map();

//UI variables
fontSizeLabels = 20;
labelDistance = fontSizeLabels / 16;
cornerX = 10;
cornerY = 10;

function preload() {
    this.load.image('buttonPause', 'assets/pause_icon_0.png');
}

function create() {
    //counters
    peopleNow = 1;
    rolesNow = 1;
    entitlementsNow = 1;
    systemsNow = 1;

    //multipliers
    multipliers.set('people', 1);
    multipliers.set('roles', 1);
    multipliers.set('entitlements', 0.5);
    multipliers.set('systems', 1);

    //timers for counters
    timer.set('time', this.time.addEvent({
        delay: 100,                // ms
        callback: updateTime,
        //args: [-],
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
    timer.set('entitlements', this.time.addEvent({
        delay: 1000,                // ms
        callback: recomputeEntitlements,
        //args: [],
        callbackScope: this,
        loop: true
    }));
    timer.set('systems', this.time.addEvent({
        delay: 30000,                // ms
        callback: recomputeSystems,
        //args: [],
        callbackScope: this,
        loop: true
    }));

    //labels with counters
    timeLabel = addLabel(this, 1);
    systemsLabel = addLabel(this, 2);
    rolesLabel = addLabel(this, 3);
    peopleLabel = addLabel(this, 4);
    entitlementsLabel = addLabel(this, 5);

    //game state
    paused = false;
    gameLabel = addLabel(this, 7);

    //buttons
    const buttonStop = addLabel(this, 8, 'STOP');
    const buttonPlay = addLabel(this, 8, 'PLAY', 3);
    buttonStop.setInteractive();
    buttonPlay.setInteractive();
    buttonStop.on('pointerup', pauseResumeGame, this);
    buttonPlay.on('pointerup', pauseResumeGame, this);

    updateScene();
    console.log("created");
}

function update() {
    //    timeLabel.setText("time: " + (this.time.now / 1000));
    //time of timer
    //timeLabel.setText("time: " + timer['people'].getElapsed());
}

function updateTime() {
    timeLabel.setText("days: " + Math.round(this.time.now / 1000));
}

function updateScene() {
    peopleLabel.setText("people: " + peopleNow + ", delay: " + Math.round(timer.get('people').delay) + ", multiplier: " + Math.round(multipliers.get('people')));
    rolesLabel.setText("roles: " + rolesNow + ", delay: " + Math.round(timer.get('roles').delay) + ", multiplier: " + Math.round(multipliers.get('roles')));
    entitlementsLabel.setText("entitlements: " + entitlementsNow + ", delay: " + Math.round(timer.get('entitlements').delay) + ", multiplier: " + Math.round(multipliers.get('entitlements')));
    systemsLabel.setText("systems: " + systemsNow + ", delay: " + Math.round(timer.get('systems').delay) + ", multiplier: " + Math.round(multipliers.get('systems')));
    gameLabel.setText("status: " + (paused ? "paused" : "running"));
}

function recomputePeople() {
    peopleNow = Math.round(peopleNow + multipliers.get('people'));
    timer.get('people').delay /= 1.01;
    //50ms is a limit for us
    if (timer.get('people').delay < 50) {
        timer.get('people').delay = 50;
        multipliers.set('people', multipliers.get('people') * 1.01);
    }
    updateScene();
}

function recomputeRoles() {
    rolesNow = Math.round(rolesNow + multipliers.get('roles'));
    timer.get('roles').delay /= 1.01;
    //50ms is a limit for us
    if (timer.get('roles').delay < 50) {
        timer.get('roles').delay = 50;
        multipliers.set('roles', multipliers.get('roles') * 1.01);
    }
    updateScene();
}

function recomputeEntitlements() {
    entitlementsNow = Math.round(peopleNow * rolesNow * multipliers.get('entitlements'));
    timer.get('entitlements').delay /= 1.01;
    //50ms is a limit for us
    if (timer.get('entitlements').delay < 50) {
        timer.get('entitlements').delay = 50;
        multipliers.set('entitlements', multipliers.get('entitlements') * 1.001);
    }
    updateScene();
}

function recomputeSystems() {
    systemsNow = Math.round(systemsNow + multipliers.get('systems'));
    timer.get('systems').delay /= 1.01;
    //50ms is a limit for us
    if (timer.get('systems').delay < 50) {
        timer.get('systems').delay = 50;
        multipliers.set('systems', multipliers.get('systems') * 1.01);
    }
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

function addLabel(thisGame, positionY, text = '', positionX = 0) {
    return thisGame.add.text(cornerX + positionX * (fontSizeLabels + labelDistance), cornerY + (positionY - 1) * (fontSizeLabels + labelDistance), text, { fontSize: fontSizeLabels + 'px', fill: '#000' });
}