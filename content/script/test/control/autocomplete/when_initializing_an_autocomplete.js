goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.string');
goog.require('goog.ui.ac.Remote');
goog.require('src.base.control.autocomplete');

goog.provide('src.test.control.autocomplete.whenInitializingAnAutocomplete');


/**
 @export
 */
src.test.control.autocomplete.whenInitializingAnAutocomplete.describe = function() {
  //Using
  var Current = src.base.control.autocomplete;


  //Fields

  var HiddenId_ = goog.string.getRandomString();
  var ParentContainerId_ = goog.string.getRandomString();
  var Url_ = goog.string.getRandomString();

  var appendChild_;
  var autocomplete_;
  var createADiv_;
  var createAHidden_;
  var createATextbox_;
  var createAnAutocomplete_;
  var getTheInputHandler_;
  var getTheRenderer_;
  var hidden_;
  var inputHandler_;
  var options_;
  var parentCall_;
  var parentContainer_;
  var renderer_;
  var setTheAutocompleteMethod_;
  var setInputHandlerSelectRow_;
  var setRenderRowContents_;
  var textbox_;


  //Test Hooks
  beforeEach(function() {
    autocomplete_ = {};
    hidden_ = {};
    inputHandler_ = {};
    parentContainer_ = {};
    textbox_ = {};
    renderer_ = {};

    options_ = {};
    options_[Current.ContainerId] = ParentContainerId_;
    options_[Current.Url] = Url_;
    options_[Current.HiddenId] = HiddenId_;
    options_[Current.InputClass] = 'weee';
    options_[Current.ToCall] = {};
    
    createADiv_ = function() { return parentContainer_; };
    createAHidden_ = function() { return hidden_; };
    appendChild_ = function() {};
    createATextbox_ = function() { return textbox_; };
    createAnAutocomplete_ = function() { return autocomplete_;};
    setRenderRowContents_ = function() { };
    getTheRenderer_ = function() { return renderer_;};
    getTheInputHandler_ = function() { return inputHandler_; };
    setInputHandlerSelectRow_ = function() { };
    setTheAutocompleteMethod_ = function() { };
  });


  //Support Methods

  var callTheMethod_ = function() {
    return Current.initialize(options_, setRenderRowContents_, setInputHandlerSelectRow_, createADiv_, createATextbox_, appendChild_, createAHidden_, createAnAutocomplete_, getTheRenderer_, getTheInputHandler_, setTheAutocompleteMethod_);
  };

  //Test Methods

  it('should create a parent container.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        attributes['id'] === options_[Current.ContainerId];

      return parentContainer_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });




  it('should create a textbox.', function() {
    var methodWasCalled = false;

    createATextbox_ = function(attributes) {
      methodWasCalled = attributes['id'] === Current.TextboxId &&
        attributes['class'] === options_[Current.InputClass];

      return textbox_;
    };

    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });


  it('should add the textbox to the parent container.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === parentContainer_ &&
         child === textbox_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create a hidden input.', function() {
    var methodWasCalled = false;

    createAHidden_ = function(attributes) {
      methodWasCalled = attributes['id'] === HiddenId_ &&
        attributes['name'] === HiddenId_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should add the hidden to the parent container.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === parentContainer_ &&
         child === hidden_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create a clear both div.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled || attributes['class'] === 'clearBoth';
    };
    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should add the clear both div to the parent container.', function() {
    var methodWasCalled = false;
    var clearBothDiv = {};

    createADiv_ = function(attributes) {
      return attributes['class'] === 'clearBoth' ? clearBothDiv : parentContainer_;
    };

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === parentContainer_ && child === clearBothDiv);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the autocomplete control.', function() {
    var methodWasCalled = false;

    createAnAutocomplete_ = function(url, textbox, constructor) {
      methodWasCalled = url === Url_ &&
        textbox === textbox_ &&
        constructor === goog.ui.ac.Remote;

      return autocomplete_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should get the autocomplete renderer.', function() {
    var methodWasCalled = false;

    getTheRenderer_ = function(autocomplete) {
      methodWasCalled = autocomplete === autocomplete_;
    };

    callTheMethod_();
    expect(methodWasCalled).toBe(true);
  });


  it('should set the renderRowContents method on the renderer.', function() {
    var methodWasCalled = false;

    setRenderRowContents_ = function(renderer, createADiv, getOuterHtml) {
      methodWasCalled = renderer === renderer_ &&
        createADiv === createADiv_ &&
        getOuterHtml === goog.dom.getOuterHtml;
    };
    
    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should get the input handler.', function() {
    var methodWasCalled = false;

    getTheInputHandler_ = function(autocomplete) {
      methodWasCalled = autocomplete === autocomplete_;
      return inputHandler_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the row builder method on the input handler.', function() {
    var methodWasCalled = false;

    setInputHandlerSelectRow_ = function(inputHandler, hiddenId, toCall, getElement, setValue ) {
      methodWasCalled = inputHandler === inputHandler_ &&
        hiddenId === HiddenId_ &&
        getElement === goog.dom.getElement &&
        setValue === goog.dom.forms.setValue &&
        toCall === options_[Current.ToCall];
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the row builder method on the input handler with an empty array if there are no toCall methods', function() {
    var methodWasCalled = false;
    
    options_[Current.ToCall] = null;
    
    setInputHandlerSelectRow_ = function(inputHandler, hiddenId, toCall, getElement, setValue) {
      methodWasCalled = goog.array.count(toCall) === 0;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the autocomplete method to post.', function() {
    var methodWasCalled = false;
    
    setTheAutocompleteMethod_ = function(autocomplete, method) {
      methodWasCalled = autocomplete === autocomplete_ &&
        method === 'POST';
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When initializing an autocomplete, it', function() {
  src.test.control.autocomplete.whenInitializingAnAutocomplete.describe();
});
