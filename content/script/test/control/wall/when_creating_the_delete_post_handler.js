goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.wall.constant');
goog.require('src.base.control.wall.row');

goog.provide('src.test.control.wall.row.whenCreatingTheDeletePostHandler');

/**
 @export
 */
src.test.control.wall.row.whenCreatingTheDeletePostHandler.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.wall.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.wall.row;
  
  
  //Fields
  
  var Id_ = goog.string.getRandomString();
  var RemoveUrl_ = goog.string.getRandomString();
  
  var refresh_;
  var submitToUrl_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    refresh_ = function() {};
    submitToUrl_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createDeletePostHandler(RemoveUrl_,  submitToUrl_, refresh_)(Id_);
  };
  
  
  //Test Methods
  
  it('should use the correct parameters.', function() {
    var methodWasCalled = false;
    
    submitToUrl_ = function(url, parameters, toDo){
      
      methodWasCalled = url === RemoveUrl_ &&
        parameters[ControlConstant_.Id] === Id_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should use the correct submit handler.', function() {
    var methodWasCalled = false;
    var result = {};
    
    refresh_ = function(){
      methodWasCalled = true;
    };
     
    submitToUrl_ = function(url, parameters, toDo){
      toDo(result);
    };
     
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};

describe('When creating the delete post handler, it', function() {
  src.test.control.wall.row.whenCreatingTheDeletePostHandler.describe();
});


//--namespace="src.test.control.wall.row.whenCreatingTheDeletePostHandler" ^
