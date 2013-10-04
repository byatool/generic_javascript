goog.require('goog.events');
goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formatTextAreaDisplay');
goog.require('src.base.helper.googleWrapper');


goog.provide('src.test.control.formatTextAreaDisplay.whenInitializingAFormatTextAreaDisplay');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenInitializingAFormatTextAreaDisplay.describe = function () {
  
  //Using
  
  var Current_ = src.base.control.formatTextAreaDisplay;
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  
  
  //Fields
  
  var ParentContainerId_ = goog.string.getRandomString();
  var ParentContainerClass_ = goog.string.getRandomString();
  
  var appendChild_;
  var createADiv_;
  var createShortCutHandler_;
  var createATextArea_;
  var document_;
  var formatAndFocus_;
  var formatText_;
  var parentContainer_;
  var prettyTextArea_;
  
  //Test Hooks
  
  beforeEach(function() {
    document_ = {};
    parentContainer_ = {};
    prettyTextArea_ = {};
    
    createADiv_ = function(attributes){
      switch(attributes[ControlConstant_.Class]) {
      case Constant_.ContainerId:
        return parentContainer_;
        break;
      case Constant_.PrettyTextArea:
        return prettyTextArea_;
        break;

      default:
        return parentContainer_;                      
      }};
    
    appendChild_ = function() {};
    createATextArea_ = function() {};
    createShortCutHandler_ = function(){};
    formatAndFocus_ = function() {};
    formatText_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(document_, formatText_, createADiv_, createATextArea_,
                               formatAndFocus_, createShortCutHandler_, appendChild_);
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
  
  
  it('should create the raw text area.', function() {
    var methodWasCalled = false;
    
    createATextArea_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (Constant_.RawTextArea &&
         attributes[ControlConstant_.Id] === Constant_.RawTextArea &&
         attributes[ControlConstant_.Class] === Constant_.RawTextArea);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the pretty text holder.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled || 
        (Constant_.PrettyTextArea !== undefined &&
         attributes[ControlConstant_.Id] === Constant_.PrettyTextArea &&
         attributes[ControlConstant_.Class] === Constant_.PrettyTextArea);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should create the prettify short cut handler.', function() {
    var methodWasCalled = false;
    
    formatAndFocus_ = function(container, formatText, getElementByClass,
                               getValue, setInnerHtml) {
      methodWasCalled = container === parentContainer_ &&
        formatText === formatText_ &&
        getElementByClass === goog.dom.getElementByClass &&
        getValue === goog.dom.forms.getValue &&
        setInnerHtml === src.base.helper.googleWrapper.setInnerHtml;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should create the shorcut handler.', function() {
    var methodWasCalled = false;
    var formatAndFocusResult = {};
    
    formatAndFocus_ = function() {
      return formatAndFocusResult;
    };
    
    createShortCutHandler_ = function(theDocument, createTheHandler, listen, toCall){
      methodWasCalled = theDocument === document_ &&
        createTheHandler === src.base.helper.googleWrapper.createAKeyboardShortcutHandler &&
        listen ===  goog.events.listen &&
        toCall === formatAndFocusResult;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the raw text area to the parent.', function() {
    var methodWasCalled = false;
    var rawTextArea = {};

    createATextArea_ = function() {
      return rawTextArea;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === rawTextArea);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the pretty text ares to the parent.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === prettyTextArea_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
 
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
  
};


describe('When initializing an formatTextAreaDisplay, it', function() {
  src.test.control.formatTextAreaDisplay.whenInitializingAFormatTextAreaDisplay.describe();
});



//--namespace="src.test.control.formatTextAreaDisplay.whenInitializingAFormatTextAreaDisplay" ^
