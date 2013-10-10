goog.require('src.base.helper.domCreation');
goog.provide('src.test.helper.domCreation.wheCreatingAPreElement');

/**
 @export
 */
src.test.helper.domCreation.wheCreatingAPreElement.describe = function () {
  
  //Using
  var Current_ = src.base.helper.domCreation;
  
  
  //Fields
  
  var createDom_;
  
  //Test Hooks
  
  beforeEach(function() {
    
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    
    return Current_.pre(createDom_);
  };
  
  
  //Test Methods
  
  
  it('should create the pre.', function() {
    var methodWasCalled = false;

    createDom_ = function(elementType) {
      methodWasCalled = elementType === 'pre';
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should return the pre', function() {
    var pre = {};

    createDom_ = function() {
      return pre;
    };
    
    expect(callTheMethod_()).toBe(pre);
  });
};


describe('When creating a pre element, it', function() {
  src.test.helper.domCreation.wheCreatingAPreElement.describe();
});
