goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.grid.constant');
goog.require('src.base.control.grid.header');

goog.provide('src.test.control.grid.header.whenCreatingTheHeaderColumn');

/**
 @export
 */
src.test.control.grid.header.whenCreatingTheHeaderColumn.describe = function () {

  
  //Using
  
  var Constant_ = src.base.control.grid.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.grid.header;
  
  
  //Fields
  
  
  var createADiv_;
  var currentItem_;
  var setTextContent_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    currentItem_ = {};
    
    createADiv_ = function(){};
    setTextContent_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createHeaderColumn(currentItem_, createADiv_, setTextContent_);
  };
  
  
  //Test Methods
  
  it('should create the row holder with the default class if there is no extra.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.HeaderClass !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.HeaderClass);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });


  
  it('should create the row holder with the default class and extra if there is one.', function() {
    var methodWasCalled = false;
    var itemClass = 'dfa';
    currentItem_ = {};
    currentItem_[ControlConstant_.Class] = itemClass;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.HeaderClass !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.HeaderClass + ' ' + itemClass);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should set the text of the header container.', function() {
    var methodWasCalled = false;
    var columnText = 'daf';
    var column = {};
    
    currentItem_ = {};
    currentItem_[Constant_.HeaderText] = columnText;
    
    createADiv_ = function() { return column; };
    
    setTextContent_ = function(element, text){
      methodWasCalled = methodWasCalled ||
        (element === column &&
         Constant_.HeaderText !== undefined  &&
         text === columnText);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the header column', function() {
    var column = {};
    createADiv_ = function() { return column; };
    expect(callTheMethod_()).toBe(column);
  });
  
  
  
};

describe('When creating the header column, it', function() {
  src.test.control.grid.header.whenCreatingTheHeaderColumn.describe();
});


//--namespace="src.test.control.grid.header.whenCreatingTheHeaderColumn" ^
