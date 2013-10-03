goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.prettyCodeCreator');


goog.provide('src.test.control.prettyCodeCreator.whenInitializingAPrettyCodeCreator');

/**
 @export
 */
src.test.control.prettyCodeCreator.whenInitializingAPrettyCodeCreator.describe = function () {
  
  //Using
  
  var Current_ = src.base.control.prettyCodeCreator;
  var Constant_ = src.base.control.prettyCodeCreator.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  
  //Fields
  
  var ParentContainerId_ = goog.string.getRandomString();
  var ParentContainerClass_ = goog.string.getRandomString();
  
  var createADiv_;
  var createATextArea_;
  var parentContainer_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    parentContainer_ = {};
    
    createADiv_ = function(attributes){
      switch(attributes[ControlConstant_.Class]) {
      case Constant_.ContainerId:
        return parentContainer_;
        break;               
      default:
        return parentContainer_;                      
      }};
    
    
    createATextArea_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(createADiv_, createATextArea_);
  };
  
  
  //Test Methods
  
  it('should create a parent container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (Constant_.ContainerId !== undefined &&
         Constant_.ContainerClass !== undefined &&
         attributes[ControlConstant_.Id] === Constant_.ContainerId &&
         attributes[ControlConstant_.Class] === Constant_.ContainerClass);
      
      return parentContainer_;
    };
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the raw code area.', function() {
    var methodWasCalled = false;
    
    createATextArea_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (Constant_.RawCodeArea &&
         attributes[ControlConstant_.Id] === Constant_.RawCodeArea &&
         attributes[ControlConstant_.Class] === Constant_.RawCodeArea);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the pretty code holder.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled || 
        (Constant_.PrettyCodeArea !== undefined &&
         attributes[ControlConstant_.Id] === Constant_.PrettyCodeArea &&
         attributes[ControlConstant_.Class] === Constant_.PrettyCodeArea);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
   
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
};


describe('When initializing an prettyCodeCreator, it', function() {
  src.test.control.prettyCodeCreator.whenInitializingAPrettyCodeCreator.describe();
});



//--namespace="src.test.control.prettyCodeCreator.whenInitializingAPrettyCodeCreator" ^
