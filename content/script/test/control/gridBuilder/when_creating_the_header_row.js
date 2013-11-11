goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.control.gridBuilder.header');


goog.provide('src.test.control.gridBuilder.header.whenCreatingTheHeaderRow');


/**
 @export
 */
src.test.control.gridBuilder.header.whenCreatingTheHeaderRow.describe = function() {
  
  //Using
  
  var Constant_ = src.base.control.gridBuilder.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.gridBuilder.header;
  
  
  //Fields

  var HeaderParameter = goog.string.getRandomString();
  var PropertyName_ = goog.string.getRandomString();
   
  var appendChild_;
  var createAClearDiv_;
  var createADiv_;
  var createHeaderColumn_;
  var createHeaderSortHandler_;
  var forEach_;
  var getElementByClass_;
  var mapping_;
  var options_;
  var parentContainer_;
  var row_;
  var setClick_;
  var showHeader_;
  
  //Test Hooks
  beforeEach(function() {
    
    parentContainer_ = {};
    row_ ={};
    
    mapping_ = {};
    mapping_[Constant_.PropertyName] = PropertyName_;
    showHeader_ = true;
    options_ = {};
    options_[Constant_.Map] = mapping_;
    options_[Constant_.ShowHeader] = showHeader_;
    
    appendChild_ = function(){};
    createAClearDiv_ = function(){};
    createADiv_ = function(){ return row_; };
    createHeaderColumn_ = function(){};
    createHeaderSortHandler_ = function(){};
    forEach_ = function(){};
    getElementByClass_ = function() { return null; };
    setClick_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return src.base.control.gridBuilder.header.createTheHeaderRow(options_, parentContainer_, getElementByClass_,
                                                                  createADiv_, forEach_, createHeaderColumn_,
                                                                  createHeaderSortHandler_, setClick_,
                                                                  createAClearDiv_, appendChild_);
  };
  
  
  //Test Methods
  
  it('should find the header row.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(cssClass, parent) {
      methodWasCalled = methodWasCalled ||
        (Constant_.HeaderRowClass !== undefined &&
         parent === parentContainer_ &&
         cssClass === Constant_.HeaderRowClass);
    };
    
    callTheMethod_();
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the row.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (Constant_.HeaderRowClass !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.HeaderRowClass);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the header columns.', function() {
    var methodWasCalled = 0;
    
    createHeaderColumn_ = function(currentMapping, createADiv,
                                   setTextContent){
      methodWasCalled += currentMapping === mapping_ &&
        createADiv === createADiv_ &&
        setTextContent === goog.dom.setTextContent;
    };
    
    forEach_ = function(theList, toDo){
      methodWasCalled += mapping_ === theList;
      
      toDo(mapping_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should append each header column to the parent row', function() {
    var methodWasCalled = false;
    var column = {};
    
    createHeaderColumn_ = function(){
      return column;
    };
    
    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === row_ &&
         child === column);
    };
    
    forEach_ = function(theList, toDo){
      toDo(mapping_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the clear div to the row.', function() {
    var methodWasCalled = false;
    var clearDiv = {};
    
    createAClearDiv_ = function(){
      return clearDiv;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === row_ && child === clearDiv);
    };
    
    forEach_ = function(theList, toDo){
      toDo(mapping_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the sort handler for the row.', function() {
    var methodWasCalled = false;
    
    createHeaderSortHandler_ = function(options, grid, propertyName, refresh){
      methodWasCalled = options === options_ &&
        grid === parentContainer_ &&
        propertyName === PropertyName_ &&
        refresh === src.base.control.gridBuilder.refresh;
    };
    
    forEach_ = function(theList, toDo){
      toDo(mapping_);
    }; 
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should set the click handler for the column.', function() {
    var methodWasCalled = false;
    var headerColumn = {};
    var sortHandler = {};
    
    createHeaderColumn_ = function(){
      return headerColumn;
    };
    
    createHeaderSortHandler_ = function(options, grid, propertyName, refresh){
      return sortHandler;
    };
    
    setClick_ = function(element, toCall){
      methodWasCalled  = element === headerColumn &&
        toCall === sortHandler;
    };
    
    forEach_ = function(theList, toDo){
      toDo(mapping_);
    }; 
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
   
  it('should append the row to the parent container.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === row_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
};


describe('When creating the header row, it', function() {
  src.test.control.gridBuilder.header.whenCreatingTheHeaderRow.describe();
});
