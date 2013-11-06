goog.require('goog.string');
goog.require('src.base.control.grid');
goog.require('src.base.control.grid.constant');

goog.provide('src.test.control.grid.whenCreatingThePagerButtons');

/**
 @export
 */
src.test.control.grid.whenCreatingThePagerButtons.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.grid.constant;
  var Current_ = src.base.control.grid;
  
  
  //Fields
  
  var getElementByClass_;
  var gridOptions_;
  var initializePager_;
  var parentContainer_;
  var result_;
  
  //Test Hooks
  
  beforeEach(function() {
    gridOptions_ = {};
    parentContainer_ = {};
    result_ = {};
    
    getElementByClass_ = function(){};
    initializePager_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createThePagerButtons(result_, gridOptions_, parentContainer_, getElementByClass_,
                                          initializePager_);
  };
  

  //Test Methods
  
  it('should find the button row.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(cssClass, parent) {
      methodWasCalled = methodWasCalled ||
        (Constant_.ButtonRowClass !== undefined &&
         parent === parentContainer_ &&
         cssClass === Constant_.ButtonRowClass);
    };
    
    callTheMethod_();
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the correct basic options.', function() {
    var methodWasCalled = false;
    var foundContainerRow = {};
    
    getElementByClass_ = function(){
      return foundContainerRow;
    };
     
    initializePager_ = function(result, gridOptions, pagerOptions, containerRow) {
      methodWasCalled = result === result_ &&
        gridOptions === gridOptions_ &&
        containerRow === foundContainerRow;
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};

describe('When creating the pager buttons, it', function() {
  src.test.control.grid.whenCreatingThePagerButtons.describe();
});


//--namespace="src.test.control.grid.whenCreatingThePagerButtons" ^

