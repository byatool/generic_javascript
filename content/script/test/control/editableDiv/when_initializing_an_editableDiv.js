
goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.editableDiv');
goog.require('src.base.control.editableDiv.constant');

goog.provide('src.test.control.editableDiv.whenInitializingAnEditableDiv');

/**
 @export
 */
src.test.control.editableDiv.whenInitializingAnEditableDiv.describe = function () {
  
  //Using
  
  var Current_ = src.base.control.editableDiv;
  var Constant_ = src.base.control.editableDiv.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  
  
  //Fields
  
  var ParentContainerId_ = goog.string.getRandomString();
  var ParentContainerClass_ = goog.string.getRandomString();
  var StoryText_ = goog.string.getRandomString();
   
  var createADiv_;
  var parentContainer_;
  var setTextContent_;
  var textContainer_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    parentContainer_ = {};
    textContainer_ = {};
    
    
    createADiv_ = function(attributes){
      switch(attributes[ControlConstant_.Class]) {
      case ParentContainerId_:
        return parentContainer_;
        break;
        
      case Constant_.TextContainer:
        return textContainer_;
        break;

      default:
        return parentContainer_;                      
      }};

    
    setTextContent_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(ParentContainerId_, StoryText_, createADiv_, setTextContent_);
  };
  
  
  //Test Methods
  
  it('should create a parent container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes[ControlConstant_.Id] === ParentContainerId_ &&
         attributes[ControlConstant_.Class] === ParentContainerId_);
      
      return parentContainer_;
    };
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the text holder.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.TextContainer !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.TextContainer);
      
      return textContainer_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });


  it('should set the text of the text container.', function() {
    var methodWasCalled = false;
    
    setTextContent_ = function(element, text){
      methodWasCalled = methodWasCalled ||
        (element === textContainer_ &&
         text === StoryText_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  
  // it('should return the parent container.', function() {
  //   expect(callTheMethod_()).toBe(parentContainer_);
  // });
};




describe('When initializing an editableDiv, it', function() {
  src.test.control.editableDiv.whenInitializingAnEditableDiv.describe();
});





//--namespace="src.test.control.editableDiv.whenInitializingAnEditableDiv" ^
