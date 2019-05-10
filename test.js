"use strict";

var Test = (function () {

    var instance = {};

    instance.sunShine = function (name, self, time) {
        Game.resources["sunshine"] += Game.arrowOfTime;
        Game.scheduleEvent(name, Test.sunShine, time + Game.arrowOfTime * 2000);
        return;
    }

    instance.growGrass = function (name, self, time) {
        Game.resources["grass"] += Game.arrowOfTime * Game.resources["sunshine"];
        Game.scheduleEvent(name, Test.growGrass, time + Game.arrowOfTime * 1500);
        return;
    }

    return instance;
}());