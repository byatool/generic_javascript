goog.require('goog.string');
goog.require('src.base.control.gridBuilder.header');
goog.require('src.base.control.gridBuilder.constant');

goog.provide('src.test.control.gridBuilder.header.whenCreatingTheHeaderSortHandler');

/**
 @export
 */
src.test.control.gridBuilder.header.whenCreatingTheHeaderSortHandler.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.gridBuilder.constant;
  var Current_ = src.base.control.gridBuilder.header;
  
  
  //Fields
  
  var PropertyName_ = goog.string.getRandomString();

  var grid_;
  var options_;
  var refresh_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    grid_ = {};
    
    options_ = {};
    options_[Constant_.Parameters] = {};
    refresh_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createHeaderSortHandler(options_, grid_, PropertyName_, refresh_)();
  };
  
  
  //Test Methods
  
  it('should update the sort parameter to the property name descending', function() {
    var methodWasCalled = false;
    
    callTheMethod_();
    
    methodWasCalled = Constant_.Parameters !== undefined &&
      Constant_.SortColumn !== undefined &&
      Constant_.Descending !== undefined &&
      options_[Constant_.Parameters][Constant_.SortColumn] === PropertyName_ &&
      options_[Constant_.Parameters][Constant_.Descending] === true;
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should refresh the grid.', function() {
    var methodWasCalled = false;
    
    refresh_ = function(options, grid){
      methodWasCalled = options === options_ &&
        grid === grid_;
    };

     
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};

describe('When creating the header sort handler, it', function() {
  src.test.control.gridBuilder.header.whenCreatingTheHeaderSortHandler.describe();
});


//--namespace="src.test.control.gridBuilder.header.whenCreatingTheHeaderSortHandler" ^
