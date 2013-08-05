goog.require('src.base.control.pager');
goog.provide('src.test.control.pager.whenCreatingAPageNumberContainer');

/**
 @export
 */
src.test.control.pager.whenCreatingAPageNumberContainer.describe = function () {
  
  //Using
  var Current_ = src.base.control.pager;
  
  
  //Fields
  var TotalCountOfPages_ = 10;

  var every_;
  var findNodes_;
  var pagerContainer_;
  var removeNode_;
  var result_;
  
  
  //Test Hooks
  beforeEach(function() {
    pagerContainer_ = {};
    
    findNodes_ = function(){ return []; };
    every_ = function(){};
    removeNode_ = function(){};
    
    result_ = {};
    result_[Current_.TotalCountOfPages] = TotalCountOfPages_;
    //updatedOptions[current.Parameters][current.ParametersPage] =
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createAPageNumberContainer(result_, pagerContainer_,
                                               findNodes_, every_,
                                               removeNode_);
  };
  
  
  //Test Methods
  
  it('should find any existing nodes that are higher than the page count.', function() {
    var methodWasCalled = false;
    var item = {};
    item['id'] = TotalCountOfPages_ + 1;
    
    findNodes_ = function(parent, toDo){
      methodWasCalled = parent === pagerContainer_ && toDo(item);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should remove any existing nodes that are higher that the page count.', function() {
    var methodWasCalled = false;
    var itemOne = {};
    var itemsReturned = {};
    
    findNodes_ = function(){
      return itemsReturned;
    };
    
    every_ = function(collection, toDo) {
      methodWasCalled = collection === itemsReturned;
      toDo(itemOne);
    };
    
    removeNode_ = function(node){
      methodWasCalled = methodWasCalled && (node === itemOne);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  
};


describe('When creating a page number container, it', function() {
  
  src.test.control.pager.whenCreatingAPageNumberContainer.describe();
  
});
