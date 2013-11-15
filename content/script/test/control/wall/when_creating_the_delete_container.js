goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.wall.constant');
goog.require('src.base.control.wall.row');
goog.require('src.base.helper.domHelper');

goog.provide('src.test.control.wall.row.whenCreatingTheDeleteContainer');


/**
 @export
 */
src.test.control.wall.row.whenCreatingTheDeleteContainer.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.wall.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.wall.row;
  
  
  //Fields
  
  var DeleteUrl_ = goog.string.getRandomString();
  var Id_ = goog.string.getRandomString();
  
  var createADiv_;
  var currentItem_;
  var deleteContainer_;
  var refreshGrid_;
  var setClick_;
  var setTextContent_;
  var createDeletePostHandler_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    currentItem_ = {};
    currentItem_[Constant_.FieldId] = Id_;
    
    deleteContainer_ = {};
    
    createADiv_ = function() { return deleteContainer_; };
    refreshGrid_ = function() {};
    setClick_ = function(){};
    setTextContent_ = function() {};
    createDeletePostHandler_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createDeleteContainer(currentItem_, DeleteUrl_, refreshGrid_,
                                          createADiv_, setTextContent_, createDeletePostHandler_, setClick_);
    
  };
  
  
  //Test Methods
  
  it('should create the delete holder.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.DeleteContainer !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.DeleteContainer);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the text of the delete container.', function() {
    var methodWasCalled = false;
    
    setTextContent_ = function(element, text){
      methodWasCalled = methodWasCalled ||
        (element === deleteContainer_ &&
         Constant_.DeleteContainerText !== undefined  &&
         text === Constant_.DeleteContainerText);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the delete handler.', function() {
    var methodWasCalled = false;

    createDeletePostHandler_ = function(removeUrl, submitToUrl, refesh){
      methodWasCalled = removeUrl === DeleteUrl_ &&
        submitToUrl === src.base.helper.domHelper.submitToUrl &&
        refesh === refreshGrid_;
    };
     
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should set the click.', function() {
    var methodWasCalled = 0;
    
    var deleteHandler = function(id) {
      methodWasCalled += id === Id_;
    };
    
    createDeletePostHandler_ = function(){
      return deleteHandler;
    };
    
    setClick_ = function(element, toCall){
      methodWasCalled += element === deleteContainer_;
      
      toCall();
    };
     
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });

  
  it('should return the container.', function() {
    expect(callTheMethod_()).toBe(deleteContainer_);
  });
  
};

describe('When creating the delete container, it', function() {
  src.test.control.wall.row.whenCreatingTheDeleteContainer.describe();
});


//--namespace="src.test.control.wall.row.whenCreatingTheDeleteContainer" ^
