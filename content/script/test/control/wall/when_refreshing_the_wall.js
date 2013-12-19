goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.control.wall');


goog.provide('src.test.control.wall.whenRefreshingTheWall');


/**
 @export
 */
src.test.control.wall.whenRefreshingTheWall.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.wall.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.wall;
  var GridBuilderConstant_ = src.base.control.gridBuilder.constant;
  
  
  //Fields
  
  var SubjectId_ = goog.string.getRandomString();
  
  var getElementByClass_;
  var options_;
  var parameters_;
  var refreshGrid_;
  var theWall_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    theWall_ = {};
    
    parameters_ = {};
    options_ = {};
    options_[GridBuilderConstant_.Parameters] = parameters_;
    parameters_[Constant_.SubjectId] = 'dasf';

    getElementByClass_ = function(){};
    refreshGrid_ = function(){};
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.refresh(options_, SubjectId_, theWall_, getElementByClass_, refreshGrid_);
  };
  
  
  //Test Methods
  
  it('should find the grid.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(cssClass, parent) {
      methodWasCalled = methodWasCalled ||
        (Constant_.ItemsGrid !== undefined &&
         parent === theWall_ &&
         cssClass === Constant_.ItemsGrid);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should refresh the grid with the updated subject id.', function() {
    var methodWasCalled = false;
    
    refreshGrid_ = function(options, grid){
      methodWasCalled = options[GridBuilderConstant_.MainParameter] === SubjectId_;
      
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};



describe('When refreshing a wall, it', function() {
  src.test.control.wall.whenRefreshingTheWall.describe();
});


//--namespace="src.test.control.wall.whenRefreshingTheWall" ^
