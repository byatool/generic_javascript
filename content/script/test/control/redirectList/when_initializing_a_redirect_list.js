goog.require('goog.string');
goog.require('src.base.control.redirectList');

goog.provide('src.test.control.redirectList.whenInitializingARedirectList');

/**
 @export
 */
src.test.control.redirectList.whenInitializingARedirectList.describe = function() {
  //Using
  var Current = src.base.control.redirectList;
  
  
  //Fields
  var ContainerClass_ = goog.string.getRandomString();
  var FirstDisabled_ = true;
  var FirstButtonId_ = goog.string.getRandomString();
  var FirstButtonText_ = goog.string.getRandomString();
  var FirstFor_ = goog.string.getRandomString();
  var FirstGoto_ = goog.string.getRandomString();
  var ParentContainerId_ = goog.string.getRandomString();
  
  var SecondButtonId_ = goog.string.getRandomString();
  var SecondButtonText_ = goog.string.getRandomString();
  var SecondFor_ = goog.string.getRandomString();
  var SecondGoto_ = goog.string.getRandomString();
  
  var appendChild_;
  var buttonList_;
  var createAButton_;
  var createADiv_;
  var createTheClickEvent_;
  var firstButton_;
  var getElement_;
  var getValue_;
  var options_;
  var parentContainer_;
  var redirect_;
  var secondButton_;
  var setClickEvent_;
  
  
  //Test Hooks
  beforeEach(function() {
    var createFakeButtonAttributes = function(id, text, controlIds, url, disabled) {
      var button = {};
      button[Current.ButtonId] = id;
      button[Current.ButtonText] = text;
      button[Current.Disabled] = disabled;
      button[Current.For] = controlIds;
      button[Current.Goto] = url;
      
      return button;
    };
    
    parentContainer_ = {};
    options_ = {};
    options_[Current.ContainerClass] = ContainerClass_;
    options_[Current.ContainerId] = ParentContainerId_;
    
    var firstButton = createFakeButtonAttributes(FirstButtonId_, FirstButtonText_,
                                                 [FirstFor_, SecondFor_], FirstGoto_, true);
    
    var secondButton = createFakeButtonAttributes(SecondButtonId_, SecondButtonText_,
                                                  [FirstFor_, SecondFor_], SecondGoto_, false);
    
    buttonList_ = [firstButton, secondButton];
    options_[Current.ButtonList] = buttonList_;
    
    var wasCalled = false;
    firstButton_ = {};
    secondButton_ = {};
    createAButton_ = function() {
      var result = wasCalled ? secondButton_ : firstButton_;
      wasCalled = true;
      
      return result;
    };
    
    createADiv_ = function() { return parentContainer_; };
    createTheClickEvent_ = function() {};
    getValue_ = function() { };
    getElement_ = function() {};
    redirect_ = function() {};
    setClickEvent_ = function() {};
    appendChild_ = function() {};
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current.initialize(options_, createADiv_, createAButton_, createTheClickEvent_, getValue_, getElement_, redirect_, setClickEvent_, appendChild_);
  };
  
  
  //Test Methods
  
  it('should create a parent container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = attributes['id'] === options_[Current.ContainerId] &&
        attributes['class'] === options_[Current.ContainerClass];
      
      return parentContainer_;
    };
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
  
  
  it('should create the needed buttons.', function() {
    var methodWasCalled = 0;
    
    createAButton_ = function(attributes, text) {
      methodWasCalled +=  attributes['type'] === 'button' &&
    
      ((attributes['id'] === FirstButtonId_ &&
        text === FirstButtonText_ &&
        attributes['disabled'] === 'disabled' &&
        attributes['class'] === 'disabled') ||
       (attributes['id'] === SecondButtonId_ &&
        text === SecondButtonText_ &&
        attributes['disabled'] === undefined &&
        attributes['class'] === undefined));

      return {};
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should create the click event for all buttons.', function() {
    var methodWasCalled = 0;
    
    createTheClickEvent_ = function(elementIds, url, getValue, getElement, redirect) {
      
      methodWasCalled += goog.array.equals(elementIds, [FirstFor_, SecondFor_]) &&
        redirect === redirect_ &&
        getValue === getValue_ &&
        getElement === getElement_ &&
        (url === FirstGoto_ || url === SecondGoto_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should set the click event on the button.', function() {
    var methodWasCalled = 0;
    var wasCalled = false;
    var firstEvent = {};
    var secondEvent = {};
    
    createTheClickEvent_ = function() {
      var result = wasCalled ? secondEvent : firstEvent;
      wasCalled = true;
      
      return result;
    };
    
    setClickEvent_ = function(button, method) {
      methodWasCalled += (button === firstButton_ &&
                          method === firstEvent) ||
        (button === secondButton_ &&
         method === secondEvent);
      
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should add the created buttons.', function() {
    var methodWasCalled = 0;
    
    appendChild_ = function(parent, child) {
      methodWasCalled += parent === parentContainer_ &&
        (child === firstButton_ || child === secondButton_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(2);
  });
  
};


describe('When initializing an redirectList, it', function() {
    src.test.control.redirectList.whenInitializingARedirectList.describe();
});
