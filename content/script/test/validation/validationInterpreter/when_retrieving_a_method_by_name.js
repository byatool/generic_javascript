goog.require('goog.array');
goog.require('src.site.validation.validateDate');
goog.require('src.site.validation.validationInterpreter');

goog.provide('src.test.validation.validationInterpreter.whenRetrievingAMethodByName');

/**
 @export
 */ 
src.test.validation.validationInterpreter.whenRetrievingAMethodByName.describe = function () {
  //Using
  var Current_  = src.site.validation.validationInterpreter.methodLookup;
  //Fields
  
  //Test Hooks
  beforeEach(function() {
    
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    
  };
  
  var containsFunction = function(key, value) {
    var method = goog.array.find(Current_, function(item) {
      return item[0] === key;
    });
    
    var methodName = value.name + '(';
    
    return goog.string.contains(String(method[1]), methodName);
  };
  
  
  //Test Methods
  
  it('should return the social security method.', function() {
    
    var methodName = src.site.validation.validateSocialSecurityNumber.isValid;
    var contains = containsFunction('is a valid social security number', methodName);
    
    expect(contains).toBe(true);
  });
  
  
  it('should return the not empty method.', function() {
    
    var methodName = src.site.validation.validateText.isEmpty;
    var contains = containsFunction('is not empty', methodName);
    
    expect(contains).toBe(true);
  });
  
  
  it('should return the not empty or default method.', function() {
    
    var methodName = src.site.validation.validateText.isEmptyOrIsDefault;
    var contains = containsFunction('is not empty or the default', methodName);
    
    expect(contains).toBe(true);
  });
  
  
  it('should return the date is valid method.', function() {
    
    var methodName = src.site.validation.validateDate.isValid;
    var contains = containsFunction('is a valid date', methodName);
    
    expect(contains).toBe(true);
  });
};



describe('When retrieving a method by name, it', function() {
  src.test.validation.validationInterpreter.whenRetrievingAMethodByName.describe();
});
