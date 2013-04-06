goog.require('goog.array');

goog.provide('src.site.validation.validationInterpreter');


/**
 @param {Array.<Array>} rules description.
 @param {Array.<function>} methods description.
 @return {fuction(Object) : Array.<string>} description.
 @export
 */
src.site.validation.validationInterpreter.interpret = function(rules, methods) {
    var methodsToCall = goog.array.map(rules, function(currentRule) {
        var methodToUse = goog.array.find(methods, function(method) {
            return method[0] === currentRule[0];
        })[1];

        var toCheck = goog.array.splice(currentRule, 1);

        var toCall = goog.array.map(toCheck, function(innerRule) {
            return methodToUse(innerRule);
        });

        return toCall;
    });

    return goog.array.flatten(methodsToCall);
};


/**
 @param {Array.<Array>} rules description.
 @param {Array.<function>} methods description.
 @return {fuction(Object) : Array.<string>} description.
 @export
 */
src.site.validation.validationInterpreter.interpretB = function(rules, methods) {
    var methodsToCall = goog.array.map(rules, function(currentRule) {
        var propertyName = currentRule[0];
        var toCheck = goog.array.splice(currentRule, 1);

        var toCall = goog.array.map(toCheck, function(innerRule) {
            var methodToUse = goog.array.find(methods, function(method) {
                return method[0] === innerRule[0];
            })[1];

            var arguments = goog.array.flatten([[propertyName], goog.array.slice(innerRule, 1)]);

            return methodToUse(arguments);
        });

        return toCall;
    });

    return goog.array.flatten(methodsToCall);
};

