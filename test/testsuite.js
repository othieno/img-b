(function(){
    "use strict";

    function foobar(){
        return "Hello, World!";
    }

    test("foobar()", function(){
        equal(foobar(), "Hello, World!", "Returns 'Hello, World!' string.");
    });
})();
