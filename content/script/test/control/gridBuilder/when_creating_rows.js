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
  var mapping_;
  var parentContainer_;
  var rowContainer_;
  var result_;
  var rowClickHandler_;
  var setClick_;
  var setTextContent_;


  //Test Hooks
  beforeEach(function() {
    mapping_ = {};
    parentContainer_ = {};
    result_ = {};
    result_[Current_.ListProperty] = [{},{}];
    rowContainer_ = {};

    appendChild_ = function() {};
    createADiv_ = function() { return rowContainer_;};
    createARow_ = function() {};
    findNode_ = function() { return null; };
    rowClickHandler_ = function() {};
    setClick_ = function() {};
    setTextContent_ = function() {};
  });


  //Support Methods
  var callTheMethod_ = function() {
    Current_.createRows(result_, parentContainer_, mapping_, findNode_,
                        createADiv_, appendChild_, createARow_, setTextContent_,
                        rowClickHandler_, setClick_);
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

    createARow_ = function(item, mapping, createADiv, setTextContent,
                           appendChild, rowClickHandler, setClick) {

      methodWasCalled += (item === result_[Current_.ListProperty][0] ||
                          item === result_[Current_.ListProperty][1]) &&
        mapping === mapping_ &&
        createADiv === createADiv_ &&
        setTextContent === setTextContent_ &&
        appendChild === appendChild_ &&
        rowClickHandler === rowClickHandler_ &&
        setClick === setClick_;
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
};


describe('When creating rows, it', function() {
  src.test.control.gridBuilder.whenCreatingRows.describe();
});
