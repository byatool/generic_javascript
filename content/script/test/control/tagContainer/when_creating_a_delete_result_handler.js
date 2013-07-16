goog.require('goog.string');
goog.require('src.base.control.tagContainer');

goog.provide('src.test.control.tagContainer.whenCreatingADeleteResultHandler');


/**
 @export
 */
src.test.control.tagContainer.whenCreatingADeleteResultHandler.describe = function () {
  
  //Using
  
  var Current_ = src.base.control.tagContainer;
  
  //Fields
  
  
  var DeleteUrl_ = goog.string.getRandomString();
  
  var parameters_;
  var tagItem_;
  var removeNode_;
  var submitToUrl_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    parameters_ = {};
    tagItem_ = {};

    submitToUrl_ = function(){};
    removeNode_ = function(){};
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.createDeleteTagHandler(tagItem_, DeleteUrl_, parameters_,
                                           submitToUrl_, removeNode_);
  };
  
  
  //Test Methods
  
  it('should submit to the url.', function() {
    var methodWasCalled = false;
    
    submitToUrl_ = function(url, parameters, callBack){
      methodWasCalled = url === DeleteUrl_ &&
        parameters === parameters_ &&
        String(callBack) === String(function(){});
    };
    
    callTheMethod_()();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should remove the tag.', function() {
    var methodWasCalled = false;
    
    removeNode_ = function(element){
      methodWasCalled = element === tagItem_;
    };
    
    callTheMethod_()();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When creating a delete result handler, it', function() {
  
  src.test.control.tagContainer.whenCreatingADeleteResultHandler.describe();
  
});
