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
//  var createAHidden_;
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
    //createAHidden_ = function() {};    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    //createADicreateAHidden_,
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
  
  
  // it('should create a hidden input', function() {
  //   var methodWasCalled = false;
  
  //   createAHidden_ = function(attributes) {
  //     methodWasCalled = attributes['value'] === layoutItem_[Current_.PropertyName];
  //   };
  
  //   callTheMethod_();
  
  //   expect(methodWasCalled).toBe(true);
  // });
  
  
  it('should append all children.', function() {
    var methodWasCalled = 0;
    var currentCount = 0;
    //var hidden = {};
    var label = {};
    var valueHolder = {};
    
    createADiv_ = function() {
      currentCount += 1;
      return currentCount === 1 ? parent_ : currentCount === 3 ? label : valueHolder;
    };
    
 // createAHidden_ = function() {
 //   return hidden;
 // };
    //|| child === hidden
    appendChild_ = function(container, child) {
      methodWasCalled += container === parent_ &&
        (child === label || child === valueHolder );
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
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

