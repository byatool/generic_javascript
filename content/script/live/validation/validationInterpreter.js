goog.require('goog.array');
goog.require('src.base.helper.arrayHelper');

goog.provide('src.site.validation.validationInterpreter');

/**
 @param {Array.<Array>} rules description.
 @param {Array.<function>} methods description.
 @param {?function(Array) : Object} car The method used to get the first of a list.
 @param {?function(Array) : Array} cdr The method used to get all but the first item
 in a list.
 @param {?function(Array) : Array} flatten The method that will compress all method calls
 into one method.
 @return {Array.<function>} This is the list of validation methods that were
 created.
 @export
 */
src.site.validation.validationInterpreter.interpret = function(rules, methods, car, cdr, flatten) {
  car = car ? car : src.base.helper.arrayHelper.car;
  cdr = cdr ? cdr : src.base.helper.arrayHelper.cdr;
  flatten = flatten ? flatten : goog.array.flatten;
  
  //TODO create a testable method so that it can be injected... maybe
  //  Too many untestable areas in this...
  var methodGroups = goog.array.map(rules, function(currentRule) {
    var propertyName = car(currentRule);
    var toCheck = cdr(currentRule);
    
    var toCall = goog.array.map(toCheck, function(innerRule) {
      var methodToUse = goog.array.find(methods, function(method) {
        return car(method) === car(innerRule);
      })[1];
      
      var arguments = goog.array.flatten([[propertyName], cdr(innerRule)]);
      
      return methodToUse(arguments);
    });

    return toCall;
  });

  return flatten(methodGroups);
};

