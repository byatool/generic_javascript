goog.require('src.base.helper.domCreation');
goog.provide('src.test.helper.domCreation.whenCreatingAClearDiv');


/**
 @export
 */
src.test.helper.domCreation.whenCreatingAClearDiv.describe = function() {

  //Using
  var Current_ = src.base.helper.domCreation;


  //Fields
  var createADiv_;


  //Test Hooks
  beforeEach(function() {

    createADiv_ = function() {};
  });

  //Support Methods
  var callTheMethod_ = function() {
    return Current_.createAClearDiv(createADiv_);
  };


  //Test Methods


  it('should create the div.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled || attributes['class'] === 'clearBoth';
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should return the created div.', function() {
    var createdDiv = {};
    createADiv_ = function() {
      return createdDiv;
    };

    expect(createdDiv).toBe(callTheMethod_());
  });
};


describe('When creating a clear div, it', function() {

  src.test.helper.domCreation.whenCreatingAClearDiv.describe();

});
