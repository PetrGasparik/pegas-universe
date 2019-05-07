"use strict";

var Game = (function () {

    var instance = {
        TOTHEFUTURE: 1,
        TOTHEPAST: -1,
        lastUpdateTime: 0,
        future: {},
        past: {},
        arrowOfTime: 1,
        gameTick: 0
    };

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
    };

    instance.scheduleEvent = function (name, callback, gameTime) {
        if (gameTime > 0) {
            if (this.arrowOfTime == 1) {
                if (this.future.) this.future = this.future.filter(name);
                this.past[name] = { c: callback, d: gameTime, e: 0 };
            } else if (this.arrowOfTime == -1) {
                this.past = this.past.filter(function (e) { return e[name] !== name; });
                this.future[name] = { c: callback, d: gameTime, e: 0 };
            }
        }

    }

    instance.changeArrowOfTime = function () {
        Game.arrowOfTime *= -1;
    };

    instance.start = function () {
        console.debug("Loading Game");
        //this.createInterval("Loading Animation", this.loadAnimation, 10);
        //this.createInterval("Loading", this.loadDelay, 1000);

        this.update_frame(0);
    };

    return instance;
}());

window.onload = function () {
    Game.scheduleEvent("Do something", Test.something, 1000);
    Game.scheduleEvent("Do something else", Test.somethingElse, 500);
    Game.start();
};