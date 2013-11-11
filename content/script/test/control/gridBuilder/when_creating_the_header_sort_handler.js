goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.string');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.control.gridBuilder.header');

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
  
  var column_;
  var grid_;
  var options_;
  var refresh_;
  var updateSortClass_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    column_ = {};
    grid_ = {};
    
    options_ = {};
    options_[Constant_.Parameters] = {};
    
    updateSortClass_ = function() {};
    refresh_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createHeaderSortHandler(options_, grid_, column_, PropertyName_, refresh_,
                                            updateSortClass_)();
  };
  
  
  //Test Methods
  
  it('should update the sort parameter to the property name descending', function() {
    var methodWasCalled = false;
    
    callTheMethod_();
    
    methodWasCalled = Constant_.Parameters !== undefined &&
      Constant_.SortColumn !== undefined &&
      Constant_.Descending !== undefined &&
      options_[Constant_.Parameters][Constant_.SortColumn] === PropertyName_ &&
      options_[Constant_.Parameters][Constant_.Descending] === false;
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should update toggle to ascending if the property is alread set.', function() {
    var methodWasCalled = false;
    
    options_[Constant_.Parameters][Constant_.SortColumn] = PropertyName_;
    options_[Constant_.Parameters][Constant_.Descending] = false;
    
    callTheMethod_();
    
    methodWasCalled = options_[Constant_.Parameters][Constant_.SortColumn] === PropertyName_ &&
      options_[Constant_.Parameters][Constant_.Descending] === true;
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should update toggle to descending if the property is alread set.', function() {
    var methodWasCalled = false;
    
    options_[Constant_.Parameters][Constant_.SortColumn] = PropertyName_;
    options_[Constant_.Parameters][Constant_.Descending] = true;
    
    callTheMethod_();
    
    methodWasCalled = options_[Constant_.Parameters][Constant_.SortColumn] === PropertyName_ &&
      options_[Constant_.Parameters][Constant_.Descending] === false;
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should update the sort class of the column.', function() {
    var methodWasCalled = false;
    
    updateSortClass_ = function(column, grid, has, swap, add,
                                findNodes, forEach,remove){
      methodWasCalled = column === column_ &&
        grid === grid_ &&
        has === goog.dom.classes.has &&
        swap == goog.dom.classes.swap &&
        add === goog.dom.classes.add &&
        findNodes === goog.dom.findNodes &&
        forEach === goog.array.forEach &&
        remove === goog.dom.classes.remove;
    };
    
    callTheMethod_();
    
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
