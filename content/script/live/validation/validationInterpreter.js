goog.require('goog.array');
goog.require('src.base.helper.arrayHelper');

goog.provide('src.site.validation.validationInterpreter');

/**
 @param {string} propertyName description.
 @param {Array.<function>} methods description.
 @param {Object} innerRule description.
 @param {?function(Array) : Object} find The method used find a method from the methods.
 @param {?function(Array) : Object} car The method used to get the first of a list.
 @param {?function(Array) : Array} cdr The method used to get all but the first item
 in a list.
 @param {?function(Array) : Object} peek The method used to get the last item in a list.
 @param {?function(Array) : Array} sink The method used to return all but the last item in
 a list.
 @return {function(Object) : string} The validation anonymous method.
 @export
 */
src.site.validation.validationInterpreter.createAValidationCall = function(propertyName, methods, innerRule, find, car, cdr, peek, sink) {
    
    var methodPair = find(methods, function(method) {
        return car(method) === car(innerRule);
    });
    
    var methodToUse = peek(methodPair);
    
    return function(obj) {
        var error = peek(innerRule);
        var values = sink(cdr(innerRule));
        return methodToUse(obj, propertyName, error, values);
    };
};


/**
 @param {Array.<Array>} rules description.
 @param {Array.<function>} methods description.
 @param {?function} createAValidationCall The method used to create a validation caller
 for every rule.
 @param {?function(Array) : Object} car The method used to get the first of a list.
 @param {?function(Array) : Array} cdr The method used to get all but the first item
 in a list.
 @param {?function(Array) : Array} flatten The method that will compress all method calls
 into one method.
 @return {Array.<function>} This is the list of validation methods that were
 created.
 @export
 */
src.site.validation.validationInterpreter.interpret = function(rules, methods, createAValidationCall, car, cdr, flatten) {
    createAValidationCall = createAValidationCall ? createAValidationCall : src.site.validation.validationInterpreter.createAValidationCall;
    car = car ? car : src.base.helper.arrayHelper.car;
    cdr = cdr ? cdr : src.base.helper.arrayHelper.cdr;
    flatten = flatten ? flatten : goog.array.flatten;
    
    var find = goog.array.find;
    var peek = goog.array.peek;
    var sink = src.base.helper.arrayHelper.sink;
     
    var methodGroups = goog.array.map(rules, function(currentRule) {
        var propertyName = car(currentRule);
        var toCheck = cdr(currentRule);
        
        var toCall = goog.array.map(toCheck, function(innerRule) {
            return createAValidationCall(propertyName, methods, innerRule, find, car, cdr, peek, sink);
        });
        
        return toCall;
    });

    return flatten(methodGroups);
};
