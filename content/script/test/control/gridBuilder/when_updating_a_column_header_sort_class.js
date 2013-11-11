goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.control.gridBuilder.header');

goog.provide('src.test.control.gridBuilder.header.whenUpdatingAColumnHeaderSortClass');

/**
 @export
 */
src.test.control.gridBuilder.header.whenUpdatingAColumnHeaderSortClass.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.gridBuilder.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.gridBuilder.header;
  
  
  //Fields
  
  var add_;
  var column_;
  var findNodes_;
  var forEach_;
  var grid_;
  var has_;
  var remove_;
  var swap_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    column_ = {};
    column_[ControlConstant_.Id] = 'adfas';
    grid_ = {};
    
    add_ = function() {};
    findNodes_ = function(){};
    forEach_ = function(){};
    has_ = function() {};
    remove_ = function() {};
    swap_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.updateSortClass(column_, grid_, has_, swap_, add_,
                                    findNodes_, forEach_, remove_);
  };
  
  //Test Methods
  
  it('should swap out ascending if the column is the one to change, and is ascending', function() {
    var methodWasCalled = false;
    
    has_ = function(element, cssClass){
      return cssClass === Constant_.Ascending;
    };
    
    column_[ControlConstant_.Class] = Constant_.Ascending;
    
    swap_ = function(element, from, to){
      methodWasCalled = Constant_.Descending !== undefined &&
        element === column_ &&
        from === Constant_.Ascending &&
        to === Constant_.Descending;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should swap out descending if the column is the one to change, and is descending', function() {
    var methodWasCalled = false;
    
    has_ = function(element, cssClass){
      return cssClass === Constant_.Descending;
    };
    
    column_[ControlConstant_.Class] = Constant_.Descending;
    
    swap_ = function(element, from, to){
      methodWasCalled = element === column_ &&
        from === Constant_.Descending &&
        to === Constant_.Ascending;
    };
  
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should add ascending if the column is the one to change, but has neither direction.', function() {
    var methodWasCalled = false;
  
    has_ = function(){
      return false;
    };

    add_ = function(element, cssClass){
      methodWasCalled = element === column_ &&
        cssClass === Constant_.Ascending;
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should find all other header columns.', function() {
    var methodWasCalled = 0;
    var otherColumn = {};
    // otherColumn[ControlConstant_.Id] = column_[ControlConstant_.Id] + 'da';
    otherColumn[ControlConstant_.Class] = Constant_.HeaderClass;
    
    has_ = function(element, cssClass){
      methodWasCalled += element === otherColumn &&
        cssClass === Constant_.HeaderClass;
    };
    
    
    findNodes_ = function(element, findWith){
      methodWasCalled += element === grid_;
      findWith(otherColumn);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should remove the sorting classed if the column is not the one being sorted on.', function() {
    var methodWasCalled = 0;
    var nodes = {};
    var node = {};
    
    remove_ = function(element, cssClass){
      methodWasCalled += element === node &&
        (cssClass === Constant_.Ascending ||
         cssClass === Constant_.Descending);
    };
    
    findNodes_ = function(){
      return nodes;
    };
    
    forEach_ = function(list, toDo){
      methodWasCalled += list === nodes;
      toDo(node);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(3);
    
  });
};

describe('When updating a column header sort class, it', function() {
  src.test.control.gridBuilder.header.whenUpdatingAColumnHeaderSortClass.describe();
});


//--namespace="src.test.control.gridBuilder.header.whenUpdatingAColumnHeaderSortClass" ^
