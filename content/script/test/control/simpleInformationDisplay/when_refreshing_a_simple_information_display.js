
goog.require('goog.string');
goog.require('src.base.control.simpleInformationDisplay');

goog.provide('src.test.control.simpleInformationDisplay.whenRefreshingASimpleInformationDisplay');

/**
 @export
 */
src.test.control.simpleInformationDisplay.whenRefreshingASimpleInformationDisplay.describe = function () {
  //Using
  var Current_ = src.base.control.simpleInformationDisplay;
  
  
  //Fields
  
  var Url_ = goog.string.getRandomString();

  var callBack_;
  var container_;
  var createTheCallBack_;
  var fillTheRows_;
  var submitData_; ;
  var parameter_;
  
  //Test Hooks
  beforeEach(function() {
    container_ = null;
    callBack_ = function() {};
    createTheCallBack_ = function(){ return callBack_; };
    fillTheRows_  = function(){ };
    submitData_ = function(){ };

  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    Current_.refresh(container_, Url_, parameter_, createTheCallBack_, fillTheRows_, submitData_ );
  };
  
  
  //Test Methods
  
  
  it('should create the callback method', function() {
    var methodWasCalled = false;
    
    createTheCallBack_ = function(container, fillTheRows) {
      methodWasCalled = container === container_ &&
        fillTheRows === fillTheRows_;
      
      return callBack_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should submit the data.', function() {
    var methodWasCalled = false;
    
    submitData_ = function(url, parameter, callBack){
      methodWasCalled = url === Url_ &&
        parameter === parameter_ &&
        callBack === callBack_;
    };

    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};


describe('When initializing an simpleInformationDisplay, it', function() {
  src.test.control.simpleInformationDisplay.whenRefreshingASimpleInformationDisplay.describe();
});
