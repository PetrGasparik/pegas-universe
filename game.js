"use strict";

var Game = (function () {

    var instance = {
        TOTHEFUTURE: 1,
        TOTHEPAST: -1,
        lastUpdateTime: 0,
        future: {},
        past: {},
        arrowOfTime: 1,
        gameTick: 0,
        resources: {}
    };

    instance.initialize = function () {
        this.resources["sunshine"] = 0;
        this.resources["grass"] = 0;
    }

    instance.update_frame = function (time) {
        var delta = time - Game.lastUpdateTime;
        Game.lastUpdateTime = time;
        Game.gameTick += Game.arrowOfTime * delta;
        if (Game.gameTick < 0) Game.gameTick = 0;
        Game.update();

        // This ensures that we wait for the browser to "catch up" to drawing and other events
        window.requestAnimationFrame(Game.update_frame);
    };

    instance.update = function () {
        document.getElementById('tick').innerHTML = "Time: " + Math.round(this.gameTick) + (Game.arrowOfTime == 1 ? " >>>" : " <<<");

        // Past events
        document.getElementById('past').innerHTML = "Past actions:";
        for (var name in this.past) {
            var data = this.past[name];
            document.getElementById('past').innerHTML += "<br>" + data.d + ": " + name;
            if (this.gameTick < data.d && Game.arrowOfTime == Game.TOTHEPAST) {
                console.debug(this.gameTick + ": Time to " + name + "!")
                data.c(name, this, data.d);
            }
        }

        // Current state
        document.getElementById('now').innerHTML = "Now:";
        for (var name in this.resources) {
            var data = this.resources[name];
            document.getElementById('now').innerHTML += "<br>" + name + ": " + data;
        }

        // Future events
        document.getElementById('future').innerHTML = "Future actions:";
        for (var name in this.future) {
            var data = this.future[name];
            document.getElementById('future').innerHTML += "<br>" + data.d + ": " + name;
            if (this.gameTick > data.d && Game.arrowOfTime == Game.TOTHEFUTURE) {
                console.debug(this.gameTick + ": Time to " + name + "!")
                data.c(name, this, data.d);
            }
        }

    };

    instance.scheduleEvent = function (name, callback, gameTime) {
        if (this.arrowOfTime == 1) {
            if (typeof this.future[name] !== 'undefined') this.past[name] = this.future[name];
            this.future[name] = { c: callback, d: gameTime, e: 0 };
        } else if (this.arrowOfTime == -1) {
            if (typeof this.past[name] !== 'undefined') this.future[name] = this.past[name];
            if (gameTime >= 0)
                this.past[name] = { c: callback, d: gameTime, e: 0 };
            else
                delete this.past[name];
        }

    }

    instance.changeArrowOfTime = function () {
        Game.arrowOfTime *= -1;
    };

    instance.start = function () {
        console.debug("Loading Game");
        this.initialize();

        //this.createInterval("Loading Animation", this.loadAnimation, 10);
        //this.createInterval("Loading", this.loadDelay, 1000);

        this.update_frame(0);
    };

    return instance;
}());

window.onload = function () {
    Game.scheduleEvent("sun shine", Test.sunShine, 450);
    Game.scheduleEvent("grow grass", Test.growGrass, 1000);
    Game.start();
};