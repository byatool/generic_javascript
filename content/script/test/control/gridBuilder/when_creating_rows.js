goog.require('src.base.control.gridBuilder');

goog.provide('src.test.control.gridBuilder.whenCreatingRows');

/**
 @export
 */
src.test.control.gridBuilder.whenCreatingRows.describe = function() {
  
  //Using
  var Current_ = src.base.control.gridBuilder;
  
  //Fields
  
  
  var appendChild_;
  var createADiv_;
  var createARow_;
  var findNode_;
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
    options_[Current_.Map] = {};
    options_[Current_.RowClickHandler] = function() {};
    
    result_ = {};
    result_[Current_.ListProperty] = [{},{}];
    
    appendChild_ = function() {};
    createADiv_ = function() { return rowContainer_;};
    createARow_ = function() {};
    findNode_ = function() { return null; };
    refreshGrid_ = function(){};
    setClick_ = function() {};
    setTextContent_ = function() {};
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    Current_.createRows(result_, parentContainer_, options_,
                        findNode_, createADiv_, appendChild_,
                        createARow_, setTextContent_, setClick_,
                        refreshGrid_);
  };
  
  
  //Test Methods
  
  it('should find the row container.', function() {
    var methodWasCalled = false;
    
    findNode_ = function(parent, toFind) {
      methodWasCalled = parent === parentContainer_ &&
        String(toFind) === String(function(a) {return a['className'] === Current_.RowContainerClass;});
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the row container if it does not exist.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled || attributes['class'] === Current_.RowContainerClass;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should append the row container if it did not exist.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        parent === parentContainer_ &&
        child === rowContainer_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should not append the row container if it already existed.', function() {
    var methodWasCalled = false;
    
    findNode_ = function() {
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
    
    createARow_ = function(item, options, createADiv,
                           setTextContent, appendChild, setClick,
                           refreshGrid) {
      
      methodWasCalled += (item === result_[Current_.ListProperty][0] ||
                          item === result_[Current_.ListProperty][1]) &&
        createADiv === createADiv_ &&
        setTextContent === setTextContent_ &&
        appendChild === appendChild_ &&
        setClick === setClick_ &&
        refreshGrid === refreshGrid_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should add each row to the parent container.', function() {
    var methodWasCalled = 0;
    var firstRow = {};
    var secondRow = {};
    var wasCreated = false;
    
    createARow_ = function() {
      if (!wasCreated) {
        wasCreated = true;
        return firstRow;
      }
      else {
        return secondRow;
      }
    };
    
    appendChild_ = function(parent, child) {
      methodWasCalled += parent === rowContainer_ &&
        (child === firstRow || child === secondRow);
    };
    
    callTheMethod_();

    expect(methodWasCalled).toBe(2);
  });


  it('should create a empty message if there are no rows to create.', function() {
    var methodWasCalled = false;

    result_[Current_.ListProperty] = [];

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        attributes['class'] === Current_.MessageClass;

      return {};
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the text of the message container if there are no rows.', function() {
    var methodWasCalled = false;
    var messageContainer = {};

    result_[Current_.ListProperty] = [];

    createADiv_ = function(attributes) {
      return attributes['class'] === Current_.MessageClass ?
        messageContainer :
        {};
    };

    setTextContent_ = function(element, text) {
      methodWasCalled = element === messageContainer &&
        text === Current_.NoRowsText;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the add message container if there are no rows.', function() {
    var methodWasCalled = false;
    var messageContainer = {};

    result_[Current_.ListProperty] = [];

    createADiv_ = function(attributes) {
      return attributes['class'] === Current_.MessageClass ?
        messageContainer :
        attributes['class'] === Current_.RowContainerClass ?
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
  src.test.control.gridBuilder.whenCreatingRows.describe();
});
