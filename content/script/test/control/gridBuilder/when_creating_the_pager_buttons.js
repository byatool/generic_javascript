goog.require('goog.string');
goog.require('src.base.control.gridBuilder');

goog.provide('src.test.control.gridBuilder.whenCreatingThePagerButtons');

/**
  @export
 */
src.test.control.gridBuilder.whenCreatingThePagerButtons.describe = function() {
  
  //Using
  
  var Current_ = src.base.control.gridBuilder;
  var Pager_ = src.base.control.pager;
  
  //Fields
  
  var ContainerId_ = goog.string.getRandomString();
  
  
  var appendChild_;
  var findNode_;
  var initializeThePager_;
  var gridOptions_;
  var pager_;
  var parentContainer_;
  var result_;
  
   //Test Hooks
  
  beforeEach(function() {
    parentContainer_ = {};
    gridOptions_ = {};
    gridOptions_[Pager_.Refresh] = function() {};
    result_ = {};
    
    findNode_ = function() { return null; };
    initializeThePager_ = function() { return pager_;};

    appendChild_ = function() { };
    pager_ = {};
    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    src.base.control.gridBuilder.createPagerButtons(result_, gridOptions_,
                                                    parentContainer_,
                                                    findNode_, initializeThePager_,
                                                    appendChild_);
  };
  
  
  //Test Methods
  
  it('should attempt to find the pager control.', function() {
    var methodWasCalled = false;
    
    var item = {};
    item['className'] = Current_.ButtonRowClass;
    
    findNode_ = function(parentContainer, toDo) {
      methodWasCalled = parentContainer === parentContainer_ &&
        toDo(item);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should update the existing pager.', function() {
    var methodWasCalled = false;
    
    findNode_ = function() {
      return pager_;
    };
    
    initializeThePager_ = function(result, gridOptions, pagerOptions,
                                   containerRow) {
      methodWasCalled = result === result_ &&
        gridOptions === gridOptions_ &&
        pagerOptions[Pager_.ContainerId] === Current_.ButtonRowId &&
        pagerOptions[Pager_.ContainerClass] === Current_.ButtonRowClass &&
        pagerOptions[Pager_.Refresh] === Current_.refresh &&
        containerRow === pager_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

  
  it('should not add the pager if it exists already.', function() {
    var methodWasCalled = false;
    
    findNode_ = function() {
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
        pagerOptions[Pager_.ContainerId] === Current_.ButtonRowId &&
        pagerOptions[Pager_.ContainerClass] === Current_.ButtonRowClass &&
        pagerOptions[Pager_.Refresh] === Current_.refresh &&
        containerRow === null;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
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
