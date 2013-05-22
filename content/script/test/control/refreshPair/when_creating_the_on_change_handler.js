
goog.require('goog.string');
goog.require('src.base.control.refreshPair');

goog.provide('src.test.control.refreshPair.whenCreatingTheOnChangeHandler');

/**
 @export
 */
src.test.control.refreshPair.whenCreatingTheOnChangeHandler.describe = function() {
  //Using
  var Current = src.base.control.refreshPair;
  
  
  //Fields
  
  var ParameterName_ = goog.string.getRandomString();
  var Url_ = goog.string.getRandomString();
  
  var elementToWatch_;
  var getValue_;
  var parameterName_;
  var submitResultHandler_;
  var submitToUrl_;
  
  
  //Test Hooks
  beforeEach(function() {
    elementToWatch_ = {};
    getValue_ = function() {};
    submitResultHandler_ = {};
    submitToUrl_ = function() {};
    parameterName_ = {};
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current.createOnChangeHandler(Url_, parameterName_, elementToWatch_, getValue_, submitToUrl_, submitResultHandler_)();
  };
  
  
  //Test Methods
  
  
  it('should get the value from the to watch element.', function() {
    var methodWasCalled = false;
    
    getValue_ = function(element) {
      methodWasCalled = element === elementToWatch_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should submit to the url.', function() {
    var methodWasCalled = false;
    var parameter = {};
    var parameterValue = {};
    
    getValue_ = function() { return parameterValue; };
    
    submitToUrl_ = function(url, parameter, submitResultHandler) {
      methodWasCalled = url === Url_ &&
        parameter[parameterName_] === parameterValue &&
        submitResultHandler === submitResultHandler;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When initializing an refreshPair, it', function() {
  src.test.control.refreshPair.whenCreatingTheOnChangeHandler.describe();
});
