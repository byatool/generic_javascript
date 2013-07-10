goog.require('src.base.control.gridBuilder');

goog.provide('src.test.control.gridBuilder.whenCreatingTheResultHandler');

/**
 @export
 */
src.test.control.gridBuilder.whenCreatingTheResultHandler.describe = function() {

  //Using
  var Current = src.base.control.gridBuilder;


  //Fields
  var appendChild_;
  var createARow_;
  var createADiv_;
  var createRows_;
  var createTheHeaderRow_;
  var mapping_;
  var parentContainer_;
  var result_;
  var setTextContent_;


  //Test Hooks

  beforeEach(function() {
    mapping_ = {};
    parentContainer_ = {};
    result_ = {};

    appendChild_ = function() {};
    createARow_ = function() {};
    createADiv_ = function() {};
    createRows_ = function() {};
    createTheHeaderRow_ = function() {};
    setTextContent_ = function() {};
  });

  //Support Methods
  var callTheMethod_ = function() {
    return src.base.control.gridBuilder.createTheResultHandler(mapping_, parentContainer_, createTheHeaderRow_,
                                                               createRows_, createARow_, createADiv_, appendChild_,
                                                               setTextContent_)(result_);
  };


  //Test Methods

  it('should create the header row.', function() {
    var methodWasCalled = false;

    createTheHeaderRow_ = function(mapping, parentContainer, createADiv, setTextContent, appendChild) {
      methodWasCalled = mapping === mapping_ &&
        parentContainer === parentContainer_ &&
        createADiv === createADiv_ &&
        setTextContent === setTextContent_ &&
        appendChild === appendChild_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the rows.', function() {
    var methodWasCalled = false;

    createRows_ = function(result, parentContainer, mapping, createADiv, appendChild, createARow,  setTextContent) {
      methodWasCalled = result === result_ &&
        parentContainer === parentContainer_ &&
        mapping === mapping_ &&
        createADiv === createADiv_ &&
        appendChild === appendChild_ &&
        createARow === createARow_ &&
        setTextContent === setTextContent_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

};


describe('When creating the result handler, it', function() {

  src.test.control.gridBuilder.whenCreatingTheResultHandler.describe();

});
