goog.require('src.base.control.gridBuilder');
goog.provide('src.test.control.gridBuilder.whenCreatingTheGridRefresh');

/**
 @export
 */
src.test.control.gridBuilder.whenCreatingTheGridRefresh.describe = function () {
  
  //Using

  var Current_ = src.base.control.gridBuilder;
  
  
  //Fields
  
  var grid_;
  var options_;
  var refreshMethod_;
  
  
  //Test Hooks
  beforeEach(function() {
    grid_ = {};
    options_ = {};
    
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.createGridRefresh(options_, grid_, refreshMethod_);
  };
  
  
  //Test Methods
  
  it('should refresh the grid.', function() {
    var methodWasCalled = false;

    refreshMethod_ = function(options, grid) {
      methodWasCalled = options === options_ &&
        grid === grid_;
    };
    
    callTheMethod_()();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When creating the grid refresh, it', function() {
  
  src.test.control.gridBuilder.whenCreatingTheGridRefresh.describe();
  
});
