goog.require('goog.string');
goog.require('src.base.control.tagContainer');

goog.provide('src.test.control.tagContainer.whenCreatingATag');


/**
 @export
 */
src.test.control.tagContainer.whenCreatingATag.describe = function () {
  
  //Using
  
  var Current_ = src.base.control.tagContainer;
  
  
  //Fields
  
  var DeleteUrl_ = goog.string.getRandomString();
  
  var createADiv_;
  var parameters_;
  var parentContainer_;
  var createTagDeleteHandler_;
  var setClick_;
  var setTextContent_;
  var tagInformation_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    parameters_ = {};
    parentContainer_ = {};
    createTagDeleteHandler_ = {};
    tagInformation_ = {};
    
    createADiv_ = function() {};
    setClick_ = function() {};
    setTextContent_ = function() {};
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    Current_.createTag(parentContainer_, parameters_, tagInformation_, DeleteUrl_,
                      createADiv_, setTextContent_, createTagDeleteHandler_,
                      setClick_);
  };
  
  
  //Test Methods
  
  
  it('should create the overall container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled || attributes['class'] === Current_.TagItemClass;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};


describe('When creating a tag, it', function() {
  src.test.control.tagContainer.whenCreatingATag.describe();
});
