goog.require('goog.events');
goog.require('goog.events.KeyCodes');
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
  var GoogleWrapper_ = src.base.helper.googleWrapper;
  var KeyCodes_ = goog.events.KeyCodes;
  
  //Fields
  
  var ParentContainerId_ = goog.string.getRandomString();
  var ParentContainerClass_ = goog.string.getRandomString();
  
  var appendChild_;
  var createADiv_;
  var createAPre_;
  var createShortCutHandler_;
  var createATextArea_;
  var document_;
  var formatAndFocus_;
  var parentContainer_;
  var pre_;
  var prettyTextArea_;
  
  //Test Hooks
  
  beforeEach(function() {
    document_ = {};
    parentContainer_ = {};
    prettyTextArea_ = {};
    pre_ = {};
    
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
    createAPre_ = function() { return pre_; };
    createATextArea_ = function() {};
    createShortCutHandler_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(document_, createADiv_, createATextArea_,
                               formatAndFocus_, createShortCutHandler_, createAPre_,
                               appendChild_);
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
  
  
  it('should create the javascript format  handler.', function() {
    var methodWasCalled = false;
    
    formatAndFocus_ = function(container, formatText, getElementByClass,
                               getValue, setInnerText) {
      methodWasCalled = methodWasCalled ||
        (container === parentContainer_ &&
        formatText === Current_.javascript.format &&
        getElementByClass === goog.dom.getElementByClass &&
        getValue === goog.dom.forms.getValue &&
        setInnerText === GoogleWrapper_.setInnerText);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the javascript shorcut handler.', function() {
    var methodWasCalled = false;
    var formatAndFocusResult = {};
    
    formatAndFocus_ = function() {
      return formatAndFocusResult;
    };
    
    createShortCutHandler_ = function(theDocument, name, firstKey, secondKey,
                                      createTheHandler, listen, toCall){
      methodWasCalled = methodWasCalled ||
        (GoogleWrapper_.createAKeyboardShortcutHandler !== undefined &&
        theDocument === document_ &&
        name === Constant_.ShortcutJavascript &&
        firstKey === KeyCodes_.X &&
        secondKey === KeyCodes_.J &&
        createTheHandler === GoogleWrapper_.createAKeyboardShortcutHandler &&
        listen ===  goog.events.listen &&
        toCall === formatAndFocusResult);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the html format handler.', function() {
    var methodWasCalled = false;
    
    formatAndFocus_ = function(container, formatText, getElementByClass,
                               getValue, setInnerText) {
      methodWasCalled = methodWasCalled ||
        (container === parentContainer_ &&
        formatText === Current_.html.format &&
        getElementByClass === goog.dom.getElementByClass &&
        getValue === goog.dom.forms.getValue &&
        setInnerText === GoogleWrapper_.setInnerText);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the html shorcut handler.', function() {
    var methodWasCalled = false;
    var formatAndFocusResult = {};
    
    formatAndFocus_ = function(container, format) {
      return format === Current_.html.format ?
        formatAndFocusResult :
        {};
    };
    
    createShortCutHandler_ = function(theDocument, name, firstKey, secondKey,
                                      createTheHandler, listen, toCall) {
      methodWasCalled = methodWasCalled ||
        (GoogleWrapper_.createAKeyboardShortcutHandler !== undefined &&
         theDocument === document_ &&
         name === Constant_.ShortcutHtml &&
         firstKey === KeyCodes_.X &&
         secondKey === KeyCodes_.H &&
         createTheHandler === GoogleWrapper_.createAKeyboardShortcutHandler &&
         listen ===  goog.events.listen &&
         toCall === formatAndFocusResult);
    };
     
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create a pre.', function() {
    var methodWasCalled = false;
    
    createAPre_ = function() {
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the raw text area to the parent container.', function() {
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
  
  
  it('should append the pretty text area to the pre.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === pre_ && child === prettyTextArea_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the pre container to the parent.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === pre_);
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
