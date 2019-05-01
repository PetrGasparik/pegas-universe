var Test = (function() {

    var instance = {};

    instance.something = function(name, self, time) {
        Game.deleteInterval(name);
        Game.createInterval(name, Test.something, time + 2000);
        return;
    }

    instance.somethingElse = function(name, self, time) {
        Game.deleteInterval(name);
        Game.createInterval(name, Test.somethingElse, time + 1500);
        return;
    }

    return instance;
}());