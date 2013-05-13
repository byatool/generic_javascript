goog.require('goog.string');
goog.require('src.base.control.simpleInformationDisplay');

goog.provide('src.test.control.simpleInformationDisplay.whenInitializingASimpleInformationDisplay');

/**
 @export
 */
src.test.control.simpleInformationDisplay.whenInitializingASimpleInformationDisplay.describe = function () {
  //Using
  var Current = src.base.control.simpleInformationDisplay;
  
  
  //Fields
  var ParentContainerClass_ = goog.string.getRandomString();
  var ParentContainerId_ = goog.string.getRandomString();

  var appendChild_;
  var containerDiv_;
  var createADiv_;
  var createLayoutItem_;
  var layoutItems_;
  var options_;
  var parentContainer_;
  
  
  //Test Hooks
  beforeEach(function() {
    parentContainer_ = {};
    options_ = {};
    options_[Current.ContainerId] = ParentContainerId_;
    options_[Current.ContainerClass] = ParentContainerClass_;
    
    layoutItems_ = [{'userName':'Username:'}, {'password':'Password'}];
    options_[Current.LayoutItems] = layoutItems_;
    
    containerDiv_ = {};
    
    createADiv_ = function() { return containerDiv_; };
    createLayoutItem_ = function() { return {}; };
    appendChild_ = function() {};
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current.initialize(options_, createADiv_, createLayoutItem_, appendChild_);
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
  
  
  it('should create a layout row for each item.', function() {
    var methodWasCalled = 0;
    
    createLayoutItem_ = function(item) {
      methodWasCalled += item === layoutItems_[0] ||
        item === layoutItems_[1];
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should append each created row.', function() {
    var callCount = 0;
    var firstItem = {};
    var methodWasCalled = 0;
    var secondItem = {};
    
    createLayoutItem_ = function() {
      callCount += 1;
      return callCount < 2 ? firstItem : secondItem;
    };
    
    appendChild_ = function(parentContainer, item) {
      methodWasCalled += parentContainer === containerDiv_ &&
        (item === firstItem || item === secondItem);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });

  
  it('should return the container.', function() {
    
    expect(callTheMethod_()).toBe(containerDiv_);
  });
  
};


describe('When initializing a simpleInformationDisplay, it', function() {
  src.test.control.simpleInformationDisplay.whenInitializingASimpleInformationDisplay.describe();
});
