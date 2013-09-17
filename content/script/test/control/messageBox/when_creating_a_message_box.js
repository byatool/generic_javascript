goog.require('goog.dom');
goog.require('goog.string');
goog.require('src.base.control.messageBox');

goog.provide('src.test.control.messageBox.whenCreatingAMessageBox');

/**
 @export
 */
src.test.control.messageBox.whenCreatingAMessageBox.describe = function() {
  //Imports

  var Current = src.base.control.messageBox;

  //Fields

  var createADiv_;
  var createdDiv_;
  var givenName_;
  var isEmptySafe_;
  var showElement_;
  
  //Test Hooks
  beforeEach(function() {
    createdDiv_ = {};
    
    createADiv_ = function() { return createdDiv_; };
    isEmptySafe_ = function(){ return true;  };
    showElement_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current.createMessageBox(givenName_, isEmptySafe_, createADiv_,
                                    showElement_);
  };
  
  
  //Test Methods
  
  it('should use the given name.', function() {
    var methodWasCalled = false;
    
    isEmptySafe_ = function() {
      return false;
    };
    
    createADiv_ = function(properties, elements) {
      methodWasCalled = methodWasCalled ||
        properties['id'] === givenName_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should use the default name if no name is given.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(properties, elements) {
      methodWasCalled = methodWasCalled ||
        properties['id'] === Current.DIV_MESSAGE_CONTAINER;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the child message box.', function() {

    var methodWasCalled = false;

    createADiv_ = function(properties, elements) {
      methodWasCalled = methodWasCalled ||
        properties['id'] === Current.DIV_MESSAGE_BOX;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should show the message box.', function() {
    var methodWasCalled = false;

    showElement_ = function(messageBox) {
      methodWasCalled = messageBox === createdDiv_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should return the created message container.', function() {
    expect(callTheMethod_()).toBe(createdDiv_);
  });
};

describe('When creating a message box, it', function() {
  src.test.control.messageBox.whenCreatingAMessageBox.describe();
});
