goog.require('src.base.control.gridBuilder');
goog.require('src.base.control.pager');


goog.provide('src.test.control.gridBuilder.whenCreatingTheResultHandler');

/**
 @export
 */
src.test.control.gridBuilder.whenCreatingTheResultHandler.describe = function() {

  //Using
  var Current_ = src.base.control.gridBuilder;


  //Fields
  var appendChild_;
  var createADiv_;
  var createARow_;
  var createPagerButtons_;
  var createRows_;
  var createTheHeaderRow_;
  var findNode_;
  var mapping_;
  var options_;
  var parentContainer_;
  var removeAllEvents_;
  var result_;
  var setClick_;
  var setTextContent_;
  var swap_;


  //Test Hooks

  beforeEach(function() {
    mapping_ = {};
    options_ = {};
    options_[Current_.Map] = mapping_;
    options_[Current_.RowClickHandler] = function() {};

    parentContainer_ = {};
    result_ = {};

    appendChild_ = function() {};
    createADiv_ = function() {};
    createARow_ = function() {};
    createPagerButtons_ = function() {};
    createRows_ = function() {};
    createTheHeaderRow_ = function() {};
    findNode_ = function() {};
    removeAllEvents_ = function() {};

    setClick_ = function() {};
    setTextContent_ = function() {};
    swap_ = function() {};
  });

  //Support Methods
  var callTheMethod_ = function() {
    var methodToCall =
          src.base.control.gridBuilder.createTheResultHandler(options_, parentContainer_,
                                                              createTheHeaderRow_, createRows_,
                                                              createARow_, createADiv_,
                                                              appendChild_, setTextContent_,
                                                              removeAllEvents_,
                                                              swap_, setClick_, findNode_,
                                                              createPagerButtons_);
    methodToCall(result_);
  };


  //Test Methods

  it('should create the header row.', function() {
    var methodWasCalled = false;

    createTheHeaderRow_ = function(options, parentContainer, findNode,
                                   createADiv, setTextContent, appendChild) {
      methodWasCalled = options === options_ &&
        parentContainer === parentContainer_ &&
        findNode === findNode_ &&
        createADiv === createADiv_ &&
        setTextContent === setTextContent_ &&
        appendChild === appendChild_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the rows.', function() {
    var methodWasCalled = false;

    createRows_ = function(result, parentContainer, options, findNode,
                           createADiv, appendChild, createARow, setTextContent,
                           setClick) {

      methodWasCalled = result === result_ &&
        parentContainer === parentContainer_ &&
        options === options_ &&
        findNode === findNode_ &&
        createADiv === createADiv_ &&
        appendChild === appendChild_ &&
        createARow === createARow_ &&
        setTextContent === setTextContent_ &&
        setClick === setClick_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });



  it('should create the pager buttons.', function() {
    var methodWasCalled = false;

    createPagerButtons_ = function(result, gridOptions, parentContainer,
                                   findNode, initializeThePager, appendChild) {

      methodWasCalled = result === result_ &&
        gridOptions === options_ &&
        parentContainer === parentContainer_ &&
        findNode === findNode_ &&
        appendChild === appendChild_ &&
        initializeThePager === src.base.control.pager.initialize;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });
};


describe('When creating the result handler, it', function() {

  src.test.control.gridBuilder.whenCreatingTheResultHandler.describe();

});
