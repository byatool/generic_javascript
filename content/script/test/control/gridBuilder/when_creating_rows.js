goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.control.gridBuilder.row');


goog.provide('src.test.control.gridBuilder.row.whenCreatingRows');

/**
 @export
 */
src.test.control.gridBuilder.row.whenCreatingRows.describe = function() {
  
  //Using
  
  var Constant_ = src.base.control.gridBuilder.constant;
  var Current_ = src.base.control.gridBuilder.row;
  var ControlConstant_ = src.base.control.controlConstant;
  
  
  //Fields
  
  var appendChild_;
  var createADiv_;
  var createARow_;
  var forEach_;
  var getElementByClass_;
  var options_;
  var parentContainer_;
  var refreshGrid_;
  var result_;
  var rowContainer_;
  var setClick_;
  var setTextContent_;
  
  
  //Test Hooks
  beforeEach(function() {
    parentContainer_ = {};
    rowContainer_ = {};
    
    options_ = {};
    options_[Constant_.Map] = {};
    options_[Constant_.RowClickHandler] = function() {};
    
    result_ = {};
    result_[Constant_.ListProperty] = [{}];
    
    appendChild_ = function() {};
    createADiv_ = function() { return rowContainer_;};
    createARow_ = function() {};
    forEach_ = function(){};
    getElementByClass_ = function() { return null; };
    refreshGrid_ = function(){};
    setClick_ = function() {};
    setTextContent_ = function() {};
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    Current_.createRows(result_, parentContainer_, options_,
                        createARow_, refreshGrid_, getElementByClass_,
                        createADiv_, appendChild_, forEach_, setTextContent_,
                        setClick_ );
  };
  
  
  //Test Methods
  
  it('should find the row container.', function() {
    
    var methodWasCalled = false;
    
    getElementByClass_ = function(cssClass, parent) {
      methodWasCalled = Constant_.RowContainerClass !== undefined &&
        cssClass === Constant_.RowContainerClass &&
        parent === parentContainer_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the row container if it does not exist.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (Constant_.RowContainerClass !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.RowContainerClass);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the row container if it did not exist.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === parentContainer_ &&
         child === rowContainer_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should not append the row container if it already existed.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function() {
      return rowContainer_;
    };
    
    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        parent === parentContainer_ &&
        child === rowContainer_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
  });
  
  
  it('should create a row for each result item.', function() {
    var methodWasCalled = 0;
    var currentItem = {};
    
    
    createARow_ = function(item, options, refreshGrid,
                           createADiv, setClick, forEach,
                           createColumnFromRowMap, createAClearDiv,
                           appendChild) {
      
      methodWasCalled += item === currentItem &&
        options === options_ &&
        refreshGrid === refreshGrid_ &&
        createADiv === undefined &&
        setClick === undefined &&
        forEach === undefined &&
        createColumnFromRowMap === undefined &&
        createAClearDiv === undefined &&
        appendChild === undefined;
    };
    
    forEach_ = function(theList, toDo){
      methodWasCalled += Constant_.ListProperty !== undefined &&
        theList === result_[Constant_.ListProperty];
      
      toDo(currentItem);
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should create a empty message if there are no rows to create.', function() {
    var methodWasCalled = false;
    
    result_[Constant_.ListProperty] = [];
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (Constant_.MessageClass !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.MessageClass);
      
      return {};
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the text of the message container if there are no rows.', function() {
    var methodWasCalled = false;
    var messageContainer = {};
  
    result_[Constant_.ListProperty] = [];
  
    createADiv_ = function(attributes) {
      return attributes[ControlConstant_.Class] === Constant_.MessageClass ?
        messageContainer :
        {};
    };
    
    setTextContent_ = function(element, text) {
      methodWasCalled = Constant_.NoRowsText !== undefined &&
        element === messageContainer &&
        text === Constant_.NoRowsText;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the add message container if there are no rows.', function() {
    var methodWasCalled = false;
    var messageContainer = {};
    
    result_[Constant_.ListProperty] = [];
    
    createADiv_ = function(attributes) {
      return attributes[ControlConstant_.Class] === Constant_.MessageClass ?
        messageContainer :
        attributes[ControlConstant_.Class] === Constant_.RowContainerClass ?
        rowContainer_ : {};
    };

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === rowContainer_ && child === messageContainer);
    };


    callTheMethod_();
  
    expect(methodWasCalled).toBe(true);
  });
};


describe('When creating rows, it', function() {
  src.test.control.gridBuilder.row.whenCreatingRows.describe();
});
