
goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.grid');
goog.require('src.base.control.grid.constant');

goog.provide('src.test.control.grid.whenInitializingAGrid');

/**
 @export
 */
src.test.control.grid.whenInitializingAGrid.describe = function () {
  
  //Using
  
  var Current_ = src.base.control.grid;
  var Constant_ = src.base.control.grid.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  
  
  //Fields
   
  var ParentContainerId_ = goog.string.getRandomString();
  var ParentContainerClass_ = goog.string.getRandomString();
  var Url_ = goog.string.getRandomString();
  
  var columnMap_;
  var createADiv_;
  var createARow_;
  var createGridRefresh_;
  var parameters_;
  var parentContainer_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    columnMap_ = {};
    parameters_ = {};
    parentContainer_ = {};
    
    createADiv_ = function(){ return parentContainer_; };
    createARow_ = function(){};
    createGridRefresh_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(ParentContainerId_, Url_, parameters_,
                               columnMap_, createARow_, createADiv_,
                               createGridRefresh_);
  };
  
  
  //Test Methods
  //options
  // rowClickHandler
  // GridBuilder_.Map  = column list
  // Url
  // parameters
  
  // gridBuilderOptions[GridBuilder_.ContainerClass] = Constant_.TransactionHistoryGrid;

  
  // gridBuilderOptions[GridBuilder_.ContainerId] = Constant_.TransactionHistoryGrid;

  
  // gridBuilderOptions[GridBuilder_.Url] = transactionHistoryUrl;

  
  // gridBuilderOptions[GridBuilder_.Parameters] = {'page': 0};
  
  
  // gridBuilderOptions[GridBuilder_.Map] = transactionHistoryGridDefinition;
  //  header
  
  
  // gridBuilderOptions[GridBuilder_.ShowHeader] = true;
  //  header
  
  
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
  
  
  // it('should create the grid refresh.', function() {
  //   var methodWasCalled = false;
  
  //   createGridRefresh_ = function(container, options, refresh){
  //     methodWasCalled = container === parentContainer_ &&
  //       options === null &&
  //       refresh === Current_.refresh;
  //   };
    
    
  //   callTheMethod_();
    
  //   expect(methodWasCalled).toBe(true);
  // });
  
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
};


describe('When initializing an grid, it', function() {
  src.test.control.grid.whenInitializingAGrid.describe();
});

//--namespace="src.test.control.grid.whenInitializingAGrid" ^
