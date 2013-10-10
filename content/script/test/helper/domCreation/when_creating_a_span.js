goog.require('goog.string');
goog.require('src.base.helper.domCreation');
goog.provide('src.test.helper.domCreation.whenCreatingASpan');


/**
 @export
 */
src.test.helper.domCreation.whenCreatingASpan.describe = function() {
  
  //Using
  
  var Current_ = src.base.helper.domCreation;
  
  
  //Fields
  
  var Text_ = goog.string.getRandomString();
  
  var attributes_;
  var createASpan_;
  var createDom_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    attributes_ = {};
    createDom_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.span(attributes_, Text_, createDom_);
  };
  
  
  //Test Methods
  
  it('should create the span.', function() {
    var methodWasCalled = false;
    
    createDom_ = function(name, attributes, text) {
      methodWasCalled = name === 'span' &&
        attributes === attributes_ &&
        text === Text_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the created div.', function() {
    var createdSpan = {};
    
    createDom_ = function() {
      return createdSpan;
    };
    
    expect(createdSpan).toBe(callTheMethod_());
  });
};


describe('When creating a span, it', function() {
  src.test.helper.domCreation.whenCreatingASpan.describe();
});
