goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.wall');
goog.require('src.base.control.wall.constant');

goog.provide('src.test.control.wall.whenInitializingAWall');

/**
 @export
 */
src.test.control.wall.whenInitializingAWall.describe = function () {
  
  //Using
  
  var Current_ = src.base.control.wall;
  var Constant_ = src.base.control.wall.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  
  
  //Fields
  
  var ParentContainerId_ = goog.string.getRandomString();
  var ParentContainerClass_ = goog.string.getRandomString();
  var PostTo_ = goog.string.getRandomString();
  var SubjectId_ = goog.string.getRandomString();
  
  var createADiv_;
  var createTheForm_;
  var initializeTheForm_;
  var parentContainer_;
  
  
   //Test Hooks
  
  beforeEach(function() {
    parentContainer_ = {};
    
    createADiv_ = function(){ return parentContainer_; };
    createTheForm_ = function(){};
    initializeTheForm_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(ParentContainerId_, PostTo_, SubjectId_, createADiv_,
                               createTheForm_, initializeTheForm_);
  }; 
  
  
  //Test Methods
  
  it('should create a parent container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes[ControlConstant_.Id] === ParentContainerId_ &&
         attributes[ControlConstant_.Class] === ParentContainerId_);
      
      return parentContainer_;
    };
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the form.', function() {
    var methodWasCalled = false;
    
    createTheForm_ = function(postTo, subjectId){
      methodWasCalled = postTo === PostTo_ &&
        subjectId === SubjectId_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  // it('should initialize the form.', function() {
  //   var methodWasCalled = false;
  //   var createdForm = {};
    
  //   createTheForm_ = function(){
  //     return createdForm;
  //   };
    
    
  //   initializeTheForm_ = function(form, onSubmit){
  //     methodWasCalled = form === createdForm &&
  //       onSubmit === onSubmit_;
  //   };
    
  //   callTheMethod_();
    
  //   expect(methodWasCalled).toBe(true);
  // });
  
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
};


describe('When initializing an wall, it', function() {
  src.test.control.wall.whenInitializingAWall.describe();
});
