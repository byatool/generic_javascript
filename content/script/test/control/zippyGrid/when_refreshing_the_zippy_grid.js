goog.require('goog.string');
goog.require('src.base.control.gridBuilder');
goog.require('src.base.control.zippyGrid');

goog.provide('src.test.control.zippyGrid.whenRefreshingAZippyGrid');

/**
 @export
 */
src.test.control.zippyGrid.whenRefreshingAZippyGrid.describe = function () {
  
  
  //Using
  
  var Current_ = src.base.control.zippyGrid;
  var GridBuilder_ = src.base.control.gridBuilder;
  
  
  //Fields
  
  var ContainerId_ = goog.string.getRandomString();
  var NewWorkId_ = goog.string.getRandomString();
  var OldWorkId_ = goog.string.getRandomString();

  var gridBuilderOptions_;
  var findNode_;
  var handleParameters_;
  var options_;
  var parameters_;
  var refreshGrid_;
  var zippyGrid_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    options_ = {};
    gridBuilderOptions_ = {};
    parameters_ = {};
    zippyGrid_ = {};
    
    gridBuilderOptions_[GridBuilder_.Parameters] = parameters_;
    options_[Current_.ZippyContainerId + 'Options'] = gridBuilderOptions_;
    
    handleParameters_ = function() {};
    refreshGrid_ = function(){};
    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.refresh(options_, zippyGrid_, handleParameters_,
                            findNode_, refreshGrid_);
  };
  
  
  //Test Methods
  
  it('should have a current work id constant.', function() {
    expect(Current_.WorkId).toBe('workId');
  });
  
  
  it('should have a page constant', function() {
    expect(Current_.Page).toBe('page');
  });
  
  
  it('should set the parameters.', function() {
    var methodWasCalled = false;
    
    handleParameters_ = function(options, parameters){
      
      methodWasCalled = options === options_ &&
        parameters === parameters_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should find the grid.', function() {
    var methodWasCalled = false;
    var item = {};
    item['id'] = Current_.ContentContainerClass;
    
    findNode_ = function(element, toFind ){
      methodWasCalled = element === zippyGrid_ &&
        toFind(item);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should refresh the grid.', function() {
    var methodWasCalled = false;
    var grid = {};
    
    findNode_ = function(){
      return grid;
    };
    
    refreshGrid_ = function(options, element){
      methodWasCalled = element === grid &&
        options === gridBuilderOptions_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};


describe('When refreshing an zippyGrid, it', function() {
  src.test.control.zippyGrid.whenRefreshingAZippyGrid.describe();
});
