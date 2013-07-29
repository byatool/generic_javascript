goog.require('goog.string');
goog.require('src.base.control.zippyContainer');

goog.provide('src.test.control.zippyContainer.whenInitializingAZippyContainer');

/**
 @export
 */
src.test.control.zippyContainer.whenInitializingAZippyContainer.describe = function () {
  
  //Using
  var Current_ = src.base.control.zippyContainer;
  
  
  //Fields
  var HeaderText_ = goog.string.getRandomString();
  var ParentContainerId_ = goog.string.getRandomString();
  var Title_ = goog.string.getRandomString();
  
  var appendChild_;
  var createADiv_;
  var createAZippy_;
  var header_;
  var options_;
  var parentContainer_;
  var setTextContent_;
  var titleContainer_;
  var toHold_;
  
  
  //Test Hooks
  beforeEach(function() {
    header_ = {};
    parentContainer_ = {};
    titleContainer_ = {};
    toHold_ = {};
    
    options_ = {};
    options_[Current_.ContainerId] = ParentContainerId_;
    options_[Current_.Title] = Title_;
    
    createADiv_ = function(attributes){
      return attributes['class'] === ParentContainerId_ ?
        parentContainer_ :
        header_;
    };
    
    appendChild_ = function(){};
    createAZippy_ = function(){};
    setTextContent_ = function(){};
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.initialize(options_, toHold_, createADiv_, appendChild_,
                               setTextContent_, createAZippy_);
  };
  
  
  //Test Methods
  
  it('should create a parent container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes['id'] === options_[Current_.ContainerId] &&
         attributes['class'] === options_[Current_.ContainerId]);
      
      return parentContainer_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
  
  
  it('should create the header.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        attributes['class'] === Current_.HeaderClass;
      return {};
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  // it('should set the header text.', function() {
  //   var methodWasCalled = false;
    
  //   setTextContent_ = function(element, text){
  //     methodWasCalled = methodWasCalled ||
  //       (element === header_ && text === HeaderText_);
  //   };
 
  //   callTheMethod_();
    
  //   expect(methodWasCalled).toBe(true);
  // });
  
  
  // it('should add the  header to the parent container.', function() {
  //   var methodWasCalled = false;
  
  //   appendChild_ = function(parent, child){
  //     methodWasCalled = parent === parentContainer_ &&
  //       child === titleContainer_;
  //   };

    
  //   callTheMethod_();
    
  //   expect(methodWasCalled).toBe(true);
  // });
};




describe('When initializing an zippyContainer, it', function() {
  src.test.control.zippyContainer.whenInitializingAZippyContainer.describe();
});





  
