goog.require('goog.array');
goog.require('src.base.helper.arrayHelper');
goog.require('src.site.validation.validateDate');
goog.require('src.site.validation.validateSocialSecurityNumber');
goog.require('src.site.validation.validateText');


goog.provide('src.site.validation.validationInterpreter');

/**
 @protected
 */
src.site.validation.validationInterpreter.methodLookup = [
  ['is a valid social security number', function(toCheck, propertyName, error, rest) {
    return src.site.validation.validateSocialSecurityNumber.isValid(toCheck.get(propertyName)) ? null : error;
  }],
  ['is not empty', function(toCheck, propertyName, error, rest) {
    return !src.site.validation.validateText.isEmpty(toCheck.get(propertyName)) ? null : error;
  }],
  ['is not empty or the default', function(toCheck, propertyName, error, rest) {
    return !src.site.validation.validateText.isEmptyOrIsDefault(toCheck.get(propertyName), rest[0]) ? null : error;
  }],
  ['is a valid date', function(toCheck, propertyName, error, rest) {
    return src.site.validation.validateDate.isValid(toCheck.get(propertyName).toString()) ? null : error;
  }]
];

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
 @param {Array} rules The supplied rules to interpret.
 @param {?Array} methods The method lookup table.
 @param {?function} interpret The method used to create the
 validation group.
 @param {function} map The function used to create the errors
 from calling the validation methods.
 @param {function} filter The function used to remove any
 non errors.
 @param {function} isEmptySafe The function used to check if an
 error is empty.
 @return {function} The created method used to call all the
 validation methods supplied by interpret.
 @export
 */
src.site.validation.validationInterpreter.createAValidationWrapper =
  function(rules, methods, interpret, map,
          filter, isEmptySafe) {
    
    methods = methods ?
      methods :
      src.site.validation.validationInterpreter.methodLookup;
    
    interpret = interpret ?
      interpret :
      src.site.validation.validationInterpreter;
    
    map = map ? 
      map : 
      goog.array.map;
    
    filter = filter ? 
      filter : 
      goog.array.filter;
    
    isEmptySafe = isEmptySafe ? 
      isEmptySafe : 
      goog.string.isEmptySafe;
    
    
    /* START */
    
    var Current = src.site.validation.validationInterpreter;
    
    var methodGroup = interpret(rules, methods);
    
    return function(value) {
      var errors = map(methodGroup, function(method) {
        return method(value);
      });
      
      return filter(errors, function(error) {
        return !isEmptySafe(error);
      });
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
src.site.validation.validationInterpreter.interpret =
  function(rules, methods, createAValidationCall, car, cdr, flatten) {
    
    var current = src.site.validation.validationInterpreter;
    
    createAValidationCall = createAValidationCall ? createAValidationCall : current.createAValidationCall;
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
