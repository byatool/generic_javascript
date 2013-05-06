goog.require('src.base.control.dropDownList');

goog.provide('src.test.control.dropDownList.whenCreatingAParameterList');

/**
 @export
 */
src.test.control.dropDownList.whenCreatingAParameterList.describe = function () {
  //Using
  var Current = src.base.control.dropDownList;
  
  
  //Fields
  
  var ParameterTextOne = goog.string.getRandomString();
  var ParameterTextTwo = goog.string.getRandomString();
  var ParameterValueOne = goog.string.getRandomString();
  var ParameterValueTwo = goog.string.getRandomString();
  
  var parameters_;
  
  //Test Hooks
  beforeEach(function() {
    parameters_ = [];
    var parameterOne = {};
    parameterOne[ParameterTextOne] = ParameterValueOne;
    parameters_.push(parameterOne);
    
    var parameterTwo = {};
    parameterTwo[ParameterTextTwo] = ParameterValueTwo;
    parameters_.push(parameterTwo);
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return src.base.control.dropDownList.createRequestParameterText(parameters_);
  };
  
  //Test Methods
  
  it('should return the request parameter text.', function() {
    expect(callTheMethod_()).toBe('?' +
                                  ParameterTextOne + '=' + ParameterValueOne + '&' +
                                  ParameterTextTwo + '=' + ParameterValueTwo);
  });
  
};


describe('When when creating a parameter list, it', function() {
  
  src.test.control.dropDownList.whenCreatingAParameterList.describe();
  
});
