goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.wall.constant');


goog.provide('src.test.control.wall.whenCreatingARow');

/**
 @export
 */
src.test.control.wall.whenCreatingARow.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.wall.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.wall;
  
  
  //Fields
  
  var createADiv_;
  var currentItem_;
  var options_;
  var refreshGrid_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    currentItem_ = {};
    options_ = {};
    
    createADiv_ = function(){};
    refreshGrid_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createARow(currentItem_, options_, refreshGrid_, createADiv_);
  };
  
  
  //Test Methods
  
  
  it('should create the row holder.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.WallRow !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.WallRow &&
         attributes[ControlConstant_.Id] === Constant_.WallRow);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  
};



describe('When creating a row, it', function() {
  src.test.control.wall.whenCreatingARow.describe();
});



