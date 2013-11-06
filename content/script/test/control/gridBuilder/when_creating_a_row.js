goog.require('goog.dom');
goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.control.gridBuilder.row');

goog.provide('src.test.control.gridBuilder.row.whenCreatingARow');

/**
 @export
 */
src.test.control.gridBuilder.row.whenCreatingARow.describe = function() {
  
  //Using
  
  var Constant_ = src.base.control.gridBuilder.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.gridBuilder.row;
  
  
  //Fields
  
  
  var FirstColumnClass_ = goog.string.getRandomString();
  
  
  
  // var createdCount_;
  // var nameColumn_;
  // var professionColumn_;
  
  // var setTextContent_;
  // var currentItem;
  
  var appendChild_;
  var columnMapping_;
  var createAClearDiv_;
  var createADiv_;
  var createRowFromMapItem_;
  var currentItem_;
  var forEach_;
  var options_;
  var refreshGrid_;
  var row_;
  var rowClickHandler_;
  var setClick_;
  
  
  //Test Hooks
  beforeEach(function() {
    currentItem_ = {};
    row_ = {};
    
    appendChild_ = function(){};
    createADiv_ = function(){ return row_; };
    createAClearDiv_ = function() {};
    createRowFromMapItem_ = function(){};
    forEach_ = function(){};
    refreshGrid_ = function(){};
    setClick_ = function() {};
    
    options_ = {};
    rowClickHandler_ = function() {};
    columnMapping_ = {};
    options_[Constant_.RowClickHandler] = rowClickHandler_;
    options_[Constant_.Map] = columnMapping_;
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createARow(currentItem_, options_, refreshGrid_, createADiv_,
                               setClick_, forEach_, createRowFromMapItem_,
                               createAClearDiv_, appendChild_);;
  };
  
  
  //Test Methods
  
  it('should create the current row holder.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.RowClass !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.RowClass);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the click for the row if the handler is not null.', function() {
    var methodWasCalled = false;
    
    rowClickHandler_ = function(row) {
      methodWasCalled = methodWasCalled &&
        row === row_;
    };
    
    setClick_ = function(element, handler) {
      methodWasCalled = element === row_;
      handler();
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should not set the click event if the handler is null.', function() {
    var methodWasCalled = false;
    options_[Constant_.RowClickHandler] = null;
    
    setClick_ = function() {
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
  });
  
  
  it('should not set the click event if the handler is undefined.', function() {
    var methodWasCalled = false;
    options_[Constant_.RowClickHandler] = undefined;
    
    setClick_ = function() {
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
  });
  
  
  it('should create a div for each column.', function() {
    var methodWasCalled = 0;
    var mapping = {};
    var column = {};
    
    createRowFromMapItem_ = function(currentRowInformation, currentMapping, createADiv,
                                     setTextContent){
      
      methodWasCalled += currentRowInformation === currentItem_ &&
        currentMapping === mapping &&
        createADiv === createADiv_ &&
        setTextContent === goog.dom.setTextContent;
      
      return column;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled += parent === row_ &&
        child === column;
    };
    
    forEach_ = function(map, toDo){
      methodWasCalled += map === options_[Constant_.Map];
      toDo(mapping);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(3);
  });

  
  it('should append the clear div.', function() {
    var methodWasCalled = false;
    var clearDiv = {};

    createAClearDiv_ = function(){
      return clearDiv;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = parent === row_ &&
        child === clearDiv;
    };
     
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should return the row.', function() {
  
    expect(callTheMethod_()).toBe(row_);
  });
  
};




describe('When creating a row, it', function() {
  src.test.control.gridBuilder.row.whenCreatingARow.describe();
});
