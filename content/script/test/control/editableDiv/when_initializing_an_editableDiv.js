goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.editableDiv');
goog.require('src.base.control.editableDiv.constant');
goog.require('src.base.helper.domCreation');

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
  var PersistUrl_ = goog.string.getRandomString();
  var Text_ = goog.string.getRandomString();
  
  var appendChild_;
  var createADiv_;
  var createTheForm_;
  var createTheTextContainerClick_;
  var theForm_;
  var parentContainer_;
  var setClick_;
  var setTextContent_;
  var setValue_;
  var showElement_;
  var textContainer_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    theForm_ = {};
    
    parentContainer_ = {};
    textContainer_ = {};
    
    appendChild_ = function(){};
    
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
    
    createTheForm_ = function(){ return theForm_; };
    createTheTextContainerClick_ = function(){};
    
    showElement_ = function(){};
    setClick_ = function(){};
    setTextContent_ = function(){};
    setValue_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(ParentContainerId_, Text_, PersistUrl_, createADiv_, setTextContent_,
                               createTheForm_, showElement_, appendChild_, setValue_,
                               createTheTextContainerClick_, setClick_);
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
         text === Text_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });


  it('should append the text container to the parent.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === textContainer_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the form.', function() {
    var methodWasCalled = false;
    
    //NOTE: In this situation, I am checking to see if the correct methods are being
    // injected like before.  The difference is that I am checking for the actuall functions,
    // and not something that was injected into the initalize method.  This is done to still
    // have the level of tesing in lower methods, and not having to inject methods into the
    // parent function.
    createTheForm_ = function(id, postTo, createAForm, createATextArea, createAButton) {
      methodWasCalled = Constant_.FormId !== undefined && 
        id === Constant_.FormId &&
        postTo === PersistUrl_ &&
        createAForm === src.base.helper.domCreation.form &&
        createATextArea === src.base.helper.domCreation.textarea &&
        createAButton === src.base.helper.domCreation.button;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  
  it('should set the form visibilty.', function() {
    var methodWasCalled = false;
    
    showElement_ = function(element, show){
      methodWasCalled = methodWasCalled ||
        (element === theForm_ &&
         show === false);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  
  // it('should return the parent container.', function() {
  //   expect(callTheMethod_()).toBe(parentContainer_);
  // });
  
  
  // //p2
  
  // it('should create the text container click handler.', function() {
  //   var methodWasCalled = false;
  
  //   createTheTextContainerClick_ = function(textContainer, editTextArea, showElement){
  //     methodWasCalled = textContainer === textContainer_ &&
  //       editTextArea === theForm_ &&
  //       showElement === showElement_;
  //   };
  
  //   callTheMethod_();
  
  //   expect(methodWasCalled).toBe(true);
  // });
  
  
  // it('should set the text content on click.', function() {
  //   var methodWasCalled = false;
  //   var toClick = {};
    
  //   createTheTextContainerClick_ = function(){
  //     return toClick;
  //   };
    
  //   setClick_ = function(element, toSet){
  //     methodWasCalled = element === textContainer_ &&
  //       toSet === toClick;
  //   };
    
  //   callTheMethod_();
    
  //   expect(methodWasCalled).toBe(true);
  // });
};




describe('When initializing an editableDiv, it', function() {
  src.test.control.editableDiv.whenInitializingAnEditableDiv.describe();
});





//--namespace="src.test.control.editableDiv.whenInitializingAnEditableDiv" ^
