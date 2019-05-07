"use strict";

var Test = (function () {

    var instance = {};

    instance.something = function (name, self, time) {
        Game.scheduleEvent(name, Test.something, time + Game.arrowOfTime * 2000);
         return;
    }

    instance.somethingElse = function (name, self, time) {
        Game.scheduleEvent(name, Test.somethingElse, time + Game.arrowOfTime * 1500);
        return;
    }

    return instance;
}());