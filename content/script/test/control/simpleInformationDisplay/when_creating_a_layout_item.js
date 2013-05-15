goog.require('goog.string');
goog.require('src.base.control.simpleInformationDisplay');

goog.provide('src.test.control.simpleInformationDisplay.whenCreatingALayoutItem');

/**
 @export
 */
src.test.control.simpleInformationDisplay.whenCreatingALayoutItem.describe = function() {

  //Using

  var Current_ = src.base.control.simpleInformationDisplay;


  //Fields

  var ColumnClass_ = goog.string.getRandomString();
  var ColumnText_ = goog.string.getRandomString();
  var Label_ = goog.string.getRandomString();
  var LabelText_ = goog.string.getRandomString();
  var PropertyName_ = goog.string.getRandomString();
  var RowClass_ = goog.string.getRandomString();

  var appendChild_;
  var createADiv_;
  var layoutItem_;
  var options_;
  var parent_;


  //Test Hooks

  beforeEach(function() {
    parent_ = {};
    options_ = {};
    options_[Current_.RowClass] = RowClass_;
    options_[Current_.ColumnClass] = ColumnClass_;

    layoutItem_ = {};
    layoutItem_[Current_.Label] = LabelText_;
    layoutItem_[Current_.PropertyName] = PropertyName_;

    appendChild_ = function() {};
    createADiv_ = function() {};
  });


  //Support Methods

  var callTheMethod_ = function() {
    return Current_.createLayoutItem(layoutItem_, options_, createADiv_, appendChild_);
  };


  //Test Methods

  it('should create the container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes['class'] === options_[Current_.RowClass] &&
         attributes['id'] === layoutItem_[Current_.PropertyName]);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the label container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes, text) {
      methodWasCalled = methodWasCalled ||
        (attributes['class'] === options_[Current_.ColumnClass] &&
        text === layoutItem_[Current_.Label]);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the value container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes, text) {
      methodWasCalled = methodWasCalled ||
        (attributes['class'] === options_[Current_.ColumnClass] &&
         text === undefined);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create a clear both div.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes, text) {
      methodWasCalled = methodWasCalled ||
        (attributes['class'] === 'clearBoth');
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append all children.', function() {
    var methodWasCalled = 0;
    var currentCount = 0;
    var clearBoth = {};
    var label = {};
    var valueHolder = {};
    
    createADiv_ = function() {
      currentCount += 1;
      return currentCount === 1 ? parent_ : currentCount === 2 ?
        label : currentCount === 3 ? valueHolder : clearBoth;
    };
    
    appendChild_ = function(container, child) {
      methodWasCalled += container === parent_ &&
        (child === label || child === valueHolder || child === clearBoth);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(3);
  });
  
  
  it('should return the parent', function() {
    var currentCount = 0;
    
    createADiv_ = function() {
      currentCount += 1;
      return currentCount === 1 ? parent_ : null;
    };
    
    expect(callTheMethod_()).toBe(parent_);
  });
};


describe('When creating a layout item, it', function() {
  src.test.control.simpleInformationDisplay.whenCreatingALayoutItem.describe();
});

