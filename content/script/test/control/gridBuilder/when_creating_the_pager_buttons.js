goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder');

goog.provide('src.test.control.gridBuilder.whenCreatingThePagerButtons');

/**
  @export
 */
src.test.control.gridBuilder.whenCreatingThePagerButtons.describe = function() {
  
  //Using
  
  var ControlConstant_ = src.base.control.controlConstant;
  var Constant_ = src.base.control.gridBuilder.constant;
  var Current_ = src.base.control.gridBuilder;
  var Pager_ = src.base.control.pager;
  
  //Fields
  
  var ContainerId_ = goog.string.getRandomString();
  var NewPage_ = goog.string.getRandomString();
  
  
  var appendChild_;
  var callOnRefresh_;
  var getElementByClass_;
  var initializeThePager_;
  var gridOptions_;
  var pager_;
  var parentContainer_;
  var refreshTheGrid_;
  var result_;
  
   //Test Hooks
  
  beforeEach(function() {
    pager_ = {};
    parentContainer_ = {};
    result_ = {};
    
    callOnRefresh_ = function(){};
    refreshTheGrid_ = function(){};
    gridOptions_ = {};
    gridOptions_[Constant_.CallOnRefresh] = callOnRefresh_;
    gridOptions_[Pager_.Refresh] = refreshTheGrid_;
    gridOptions_[Constant_.Parameters] = {};
    gridOptions_[Constant_.Parameters][ControlConstant_.Page] = 1;
    
    appendChild_ = function() { };
    
    getElementByClass_ = function() { return null; };
    initializeThePager_ = function() { return pager_;};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    src.base.control.gridBuilder.createPagerButtons(result_, gridOptions_,
                                                    parentContainer_,
                                                    getElementByClass_, initializeThePager_,
                                                    appendChild_, refreshTheGrid_);
  };
  
  
  //Test Methods
  
  it('should attempt to find the pager control.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(cssClass, parentContainer) {
      methodWasCalled = Constant_.ButtonRowClass !== undefined &&
        cssClass === Constant_.ButtonRowClass &&
        parentContainer === parentContainer_; 
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should update the existing pager.', function() {
    var methodWasCalled = false;
    
    
    getElementByClass_ = function() {
      return pager_;
    };
    
    initializeThePager_ = function(result, gridOptions, pagerOptions,
                                   containerRow) {
      methodWasCalled = Constant_.ButtonRowId !== undefined &&
        Constant_.ButtonRowClass !== undefined &&
        result === result_ &&
        gridOptions === gridOptions_ &&
        pagerOptions[Pager_.ContainerId] === Constant_.ButtonRowId &&
        pagerOptions[Pager_.ContainerClass] === Constant_.ButtonRowClass &&
        containerRow === pager_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the correct refresh function.', function() {
    var methodWasCalled = false;
    
    refreshTheGrid_ = function(options, grid) {
      methodWasCalled = options === gridOptions_ &&
        grid === parentContainer_;
    };
    
    initializeThePager_ = function(result, gridOptions, pagerOptions,
                                   containerRow) {
      pagerOptions[Pager_.Refresh](NewPage_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  
  it('should update the page on the original options.', function() {
    var methodWasCalled = false;
    
    
    initializeThePager_ = function(result, gridOptions, pagerOptions,
                                   containerRow) {
      pagerOptions[Pager_.Refresh](NewPage_);
    };
    
    callTheMethod_();
    
    expect(gridOptions_[Constant_.Parameters][ControlConstant_.Page]).toBe(NewPage_);
  });
  
  
  it('should not add the pager if it exists already.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function() {
      return pager_;
    };
    
    appendChild_ = function() {
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
  });
  
  
  it('should initialize the pager if the container does not exist.', function() {
    var methodWasCalled = false;
    
    initializeThePager_ = function(result, gridOptions, pagerOptions,
                                   containerRow) {
      methodWasCalled = result === result_ &&
        gridOptions === gridOptions_ &&
        pagerOptions[Pager_.ContainerId] === Constant_.ButtonRowId &&
        pagerOptions[Pager_.ContainerClass] === Constant_.ButtonRowClass &&
        pagerOptions[Pager_.Refresh] !== null &&
        containerRow === null;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should invoke the refresh function.', function() {
    var methodWasCalled = false;
    
    callOnRefresh_ = function(result){
      methodWasCalled = result === result_;
    };
    
    gridOptions_[Constant_.CallOnRefresh] = callOnRefresh_;
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should not invoke the refresh function if it is null.', function() {
    var noErrors = true;
    
    gridOptions_[Constant_.CallOnRefresh] = null;
    
    callTheMethod_();
    
    expect(noErrors).toBe(true);
  });
  
  
  it('should not invoke the refresh function if it is undefined.', function() {
    var noErrors = true;
    
    gridOptions_[Constant_.CallOnRefresh] = undefined;
    
    callTheMethod_();
    
    expect(noErrors).toBe(true);
  });
  
  
  it('should add the pager if it did not exist before.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child) {
      methodWasCalled = parent === parentContainer_ &&
        child === pager_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When creating the pager buttons, it', function() {
  
  src.test.control.gridBuilder.whenCreatingThePagerButtons.describe();
  
});
