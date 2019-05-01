var Game = (function() {

    var instance = {
        lastUpdateTime: 0,
        intervals: {},
    };

    instance.update_frame = function(time) {
        Game.lastUpdateTime = time;
        Game.update();

        // This ensures that we wait for the browser to "catch up" to drawing and other events
        window.requestAnimationFrame(Game.update_frame);
    };

    instance.update = function() {
        document.getElementById('tick').innerHTML = "Time: " + this.lastUpdateTime;

        document.getElementById('whats-next').innerHTML = "Next actions:";

        for (var name in this.intervals) {
            var data = this.intervals[name];
            document.getElementById('whats-next').innerHTML += "<br>" + data.d + ": " + name;
            if (this.lastUpdateTime > data.d) {
                console.debug(this.lastUpdateTime + ": Time for " + name + "!")
                document.getElementById('history').innerHTML += "<br>" + data.d + ": " + name;
                data.c(name, this, data.d);
            }
        }
    };

    instance.createInterval = function(name, callback, delay) {
        this.intervals[name] = { c: callback, d: delay, e: 0 }

    };

    instance.deleteInterval = function(name) {
        delete this.intervals[name];
    };

    instance.start = function() {
        console.debug("Loading Game");
        //this.createInterval("Loading Animation", this.loadAnimation, 10);
        //this.createInterval("Loading", this.loadDelay, 1000);

        this.update_frame(0);
    };

    return instance;
}());

window.onload = function() {
    Game.createInterval("Do something", Test.something, 5000);
    Game.createInterval("Do something else", Test.somethingElse, 6500);
    Game.start();
};