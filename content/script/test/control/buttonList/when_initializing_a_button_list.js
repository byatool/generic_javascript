goog.require('goog.dom.classes');
goog.require('goog.dom.forms');
goog.require('goog.string');


goog.provide('src.test.control.buttonList.whenInitializingAButtonList');

/**
 @export
 */
src.test.control.buttonList.whenInitializingAButtonList.describe = function() {
  

  //Using
  
  var Current_ = src.base.control.buttonList;


  //Fields

  var ContainerClass_ = goog.string.getRandomString();
  var FirstText_ = goog.string.getRandomString();
  var FirstValue_ = goog.string.getRandomString();
  var HiddenId_ = goog.string.getRandomString();
  var ParentContainerId_ = goog.string.getRandomString();
  var SecondText_ = goog.string.getRandomString();
  var SecondValue_ = goog.string.getRandomString();
  var SelectedButtonClass_ = goog.string.getRandomString();

  var appendChild_;
  var createAButton_;
  var createdHidden_;
  var firstButton_;
  var forEach_;
  var createADiv_;
  var createAHidden_;
  var map_;
  var options_;
  var parentContainer_;
  var secondButton_;
  var setClick_;
  var setValue_;
  var toggleClass_;
  var updateHidden_;
  
  //Test Hooks
  beforeEach(function() {
    options_ = {};
    options_[Current_.ContainerClass] = ContainerClass_;
    options_[Current_.ElementId] = ParentContainerId_;
    options_[Current_.HiddenId] = HiddenId_;
    options_[Current_.SelectedButtonClass] = SelectedButtonClass_;
    options_[Current_.ButtonOptions] = [
      {'text': FirstText_, 'value': FirstValue_},
      {'text': SecondText_, 'value': SecondValue_}
    ];
    
    appendChild_ = function() {};
    
    var firstTime = true;
    
    createAButton_ = function() {
      var result = firstTime ? firstButton_ : secondButton_;
      firstTime = false;
      
      return result;
    };
    
    createADiv_ = function() { return parentContainer_; };
    createdHidden_ = {};
    createAHidden_ = function() { return createdHidden_; };
    forEach_ = function(){};
    map_ = function(){};
    setClick_ = function() {};
    setValue_ = function() {};
    toggleClass_ = function() {};
    updateHidden_ = function() {};
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.createAButtonList(options_, createADiv_, createAHidden_,
                                     map_, createAButton_, setClick_, setValue_,
                                      updateHidden_, toggleClass_, forEach_,
                                      appendChild_);
  };
  
  
  //Test Methods
  
  it('should create the main container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes, nonono) {
      methodWasCalled = attributes['id'] === ParentContainerId_ &&
        attributes['class'] === ContainerClass_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the main container.', function() {
    
    expect(callTheMethod_()).toBe(parentContainer_);
  });
  
  
  it('should create a hidden input.', function() {
    var methodWasCalled = false;
    
    createAHidden_ = function(attributes) {
      methodWasCalled = attributes['id'] === HiddenId_;
      return {};
    };

    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should add the hidden element to the parent container', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === parentContainer_ &&
         child === createdHidden_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create a button. ', function() {
    var methodWasCalled = 0;
    
    createAButton_ = function(attributes, text) {
      methodWasCalled += attributes['type'] === 'button' &&
        text === FirstText_;
      
      return {};
    };
    
    map_ = function(collection, toDo){
      methodWasCalled += collection === options_[Current_.ButtonOptions];
      toDo(options_[Current_.ButtonOptions][0]);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should create the update method call for each item.', function() {
    var methodWasCalled = 0;
    
    updateHidden_ = function(element, value, getValue, isEmptySafe, setValue, contains, remove) {
      methodWasCalled += element === createdHidden_ &&
        value === FirstValue_ &&
        getValue === goog.dom.forms.getValue &&
        isEmptySafe === goog.string.isEmptySafe &&
        setValue === goog.dom.forms.setValue &&
        contains === goog.string.contains &&
        remove === goog.string.removeAll;
    };
    
    map_ = function(collection, toDo){
      methodWasCalled += collection === options_[Current_.ButtonOptions];
      toDo(options_[Current_.ButtonOptions][0]);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should prepare the button class toggle for the button.', function() {
    var methodWasCalled = 0;
    
    toggleClass_ = function(element, className, toggle) {
      methodWasCalled += element === firstButton_ &&
        className === options_[Current_.SelectedButtonClass] &&
        toggle === goog.dom.classes.toggle;
    };
    
    map_ = function(collection, toDo){
      methodWasCalled += collection === options_[Current_.ButtonOptions];
      toDo(options_[Current_.ButtonOptions][0]);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should set the button clicks.', function() {
    var methodWasCalled = 0;
    
    setClick_ = function(element, method) {
      methodWasCalled += element === firstButton_;
    };
    
    map_ = function(collection, toDo){
      methodWasCalled += collection === options_[Current_.ButtonOptions];
      toDo(options_[Current_.ButtonOptions][0]);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should append the buttons to the parent.', function() {
    var methodWasCalled = 0;
    var createdButton = {};
    var buttonList = [createdButton];
    
    map_ = function(){
      return buttonList;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled += parent === parentContainer_ &&
        child === createdButton;
    };
    
    forEach_ = function(buttons, toDo){
      toDo(createdButton);
      methodWasCalled += buttons === buttonList;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
};


describe('When initializing a button list, it', function() {
  src.test.control.buttonList.whenInitializingAButtonList.describe();
});
