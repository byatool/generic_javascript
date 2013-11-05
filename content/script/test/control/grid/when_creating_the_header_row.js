goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.grid');
goog.require('src.base.control.grid.constant');

goog.provide('src.test.control.grid.header.whenCreatingTheHeaderRow');

/**
 @export
 */
src.test.control.grid.header.whenCreatingTheHeaderRow.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.grid.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.grid.header;
  
  
  //Fields

  var appendChild_;
  var columnInformation_;
  var createAClearDiv_;
  var createADiv_;
  var createHeaderColumn_;
  var forEach_;
  var getElementByClass_;
  var headerRow_;
  var parentContainer_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    columnInformation_ = {};
    headerRow_ = {};
    parentContainer_ = {};
    
    appendChild_ = function(){};
    createAClearDiv_ = function(){};
    createADiv_ = function() { return headerRow_; };
    createHeaderColumn_ = function(){};
    forEach_ = function(){};
    getElementByClass_ = function() { };
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createTheHeaderRow(parentContainer_, columnInformation_, getElementByClass_,
                                       forEach_, createADiv_, createHeaderColumn_, appendChild_,
                                       createAClearDiv_);
  };
  
  
  //Test Methods
  
  it('should find the header.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(parent, cssClass) {
      methodWasCalled = methodWasCalled ||
        (Constant_.HeaderRowClass !== undefined &&
         parent === parentContainer_ &&
         cssClass === Constant_.HeaderRowClass);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the header if it does not exist.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = attributes[ControlConstant_.Class] === Constant_.HeaderRowClass;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should create the header column for each item.', function() {
    var methodWasCalled = false;
    var mapItem = {};
    
    createHeaderColumn_ = function(item, createADiv, setTextContent){
      methodWasCalled = item === mapItem &&
        createADiv === createADiv_ &&
        setTextContent === goog.dom.setTextContent;
    };
    
    forEach_ = function(map, toDo){
      toDo(mapItem);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the header column for each item.', function() {
    var methodWasCalled = false;
    var headerColumn = {};
    var mapItem = {};
    
    createHeaderColumn_ = function(item, createADiv, setTextContent){
      return headerColumn;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled ||
        (parent === headerRow_ &&
         child === headerColumn);
    };
    
    
    forEach_ = function(map, toDo){
      toDo(mapItem);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append a clear div.', function() {
    var methodWasCalled = false;
    var clearDiv = {};
    
    createAClearDiv_ = function(){
      return clearDiv;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled ||
        (parent === headerRow_ &&
         child === clearDiv);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

   
  it('should append the headerRow to the parentContainer.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === headerRow_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should do nothing if the header row exists.', function() {
    var methodWasCalled = false;

    getElementByClass_ = function() {
      return {};
    };
    
    createADiv_ = function(){
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
  });
};

describe('When creating the header row, it', function() {
  src.test.control.grid.header.whenCreatingTheHeaderRow.describe();
});


//--namespace="src.test.control.grid.header.whenCreatingTheHeaderRow" ^
