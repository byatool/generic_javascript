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
  var mapping_;
  var parentContainer_;
  var result_;
  var setTextContent_;

  //Test Hooks
  beforeEach(function() {
    mapping_ = {};
    parentContainer_ = {};
    result_ = [{},{}];

    appendChild_ = function() {};
    createADiv_ = function() {};
    createARow_ = function() {};
    setTextContent_ = function() {};
  });


  //Support Methods
  var callTheMethod_ = function() {
    Current_.createRows(result_, parentContainer_, mapping_, createADiv_, appendChild_, createARow_, setTextContent_);
  };


  //Test Methods


  it('should create a row for each result item.', function() {
    var methodWasCalled = 0;

    createARow_ = function(item, mapping, createADiv, setTextContent, appendChild) {
      methodWasCalled += (item === result_[0] || item === result_[1]) &&
        mapping === mapping_ &&
        createADiv === createADiv_ &&
        setTextContent === setTextContent_ &&
        appendChild === appendChild_;
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
      methodWasCalled += parent == parentContainer_ &&
        (child === firstRow || child === secondRow);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(2);
  });
};


describe('When creating rows, it', function() {
  src.test.control.gridBuilder.whenCreatingRows.describe();
});
