goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.control.gridBuilder.header');


goog.provide('src.test.control.gridBuilder.header.whenCreatingAHeaderColumn');

/**
 @export
 */
src.test.control.gridBuilder.header.whenCreatingAHeaderColumn.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.gridBuilder.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.gridBuilder.header;
  
  
  //Fields
  
  var ExtraClass_ = goog.string.getRandomString(); 
  var Text_ = goog.string.getRandomString();
  
  var  createADiv_;
  var  currentMapping_;
  var  setTextContent_;
  
  //Test Hooks
  
  beforeEach(function() {
    currentMapping_ = {};
    currentMapping_[ControlConstant_.Class] = ExtraClass_;
    currentMapping_[Constant_.HeaderText] = Text_;
    
    createADiv_ = function(){};
    setTextContent_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createHeaderColumn(currentMapping_, createADiv_, setTextContent_);
  };
  
  //Test Methods
  
  it('should create the column holder with a supplied class added.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.ColumnClass !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.HeaderClass + ' ' + ExtraClass_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the column holder with no supplied class added.', function() {
    var methodWasCalled = false;

    currentMapping_ = {};
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.ColumnClass !== undefined &&
         Constant_.HeaderClass !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.HeaderClass);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

   
  it('should set the text of the column container.', function() {
    var methodWasCalled = false;
    var column = {};
    
    createADiv_ = function(){
      return column;
    };
    
    setTextContent_ = function(element, text){
      methodWasCalled = methodWasCalled ||
        (element === column &&
         Constant_.HeaderText !== undefined  &&
         text === Text_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the created column', function() {
    var column = {};
    createADiv_ = function(){ return column; };
    
    expect(callTheMethod_()).toBe(column);
  });
  
};

describe('When creating a header column, it', function() {
  src.test.control.gridBuilder.header.whenCreatingAHeaderColumn.describe();
});


//--namespace="src.test.control.gridBuilder.header.whenCreatingAHeaderColumn" ^
