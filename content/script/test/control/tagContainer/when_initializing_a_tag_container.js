goog.require('goog.string');
goog.require('src.base.control.tagContainer');

goog.provide('src.test.control.tagContainer.whenInitializingATagContainer');

/**
 @export
 */
src.test.control.tagContainer.whenInitializingATagContainer.describe = function () {

  //Using
  var Current = src.base.control.tagContainer;
  
  
  //Fields
  var ParentContainerId_ = goog.string.getRandomString();
  var Url_ = goog.string.getRandomString();
  
  var createADiv_;
  var createTheTagListHandler_;
  var parameters_;
  var parentContainer_;
  var submitToUrl_;
  var tagListHandler_;
  
  //Test Hooks
  beforeEach(function() {
    parentContainer_ = {};
    
    tagListHandler_ =  function() {};

    createADiv_ = function() {return parentContainer_; };
    createTheTagListHandler_ = function() {return tagListHandler_;};
    submitToUrl_ = function() {};
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current.initialize(ParentContainerId_, Url_, parameters_, createADiv_, createTheTagListHandler_, submitToUrl_);
  };
  
  
  //Test Methods
  
  it('should create a parent container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = attributes['id'] === ParentContainerId_;
      return parentContainer_;
    };
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
  
  
  it('should create the tag list handler.', function() {
    var methodWasCalled = false;
    
    createTheTagListHandler_ = function(container) {
      methodWasCalled = container === parentContainer_;
      
      return tagListHandler_ ;
    };
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should retrieve the tag list.', function() {
    var methodWasCalled = false;
    
    submitToUrl_ = function(url, parameters, resultHandler){
      methodWasCalled = url === Url_ &&
        parameters_ === parameters_ &&
        resultHandler === tagListHandler_;
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When initializing an tagContainer, it', function() {
  src.test.control.tagContainer.whenInitializingATagContainer.describe();
});
