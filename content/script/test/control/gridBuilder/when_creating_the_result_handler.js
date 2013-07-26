goog.require('src.base.control.gridBuilder');

goog.provide('src.test.control.gridBuilder.whenCreatingTheResultHandler');

/**
 @export
 */
src.test.control.gridBuilder.whenCreatingTheResultHandler.describe = function() {

  //Using
  var Current_ = src.base.control.gridBuilder;


  //Fields
  var appendChild_;
  var copyOptions_;
  var createADiv_;
  var createARow_;
  var createPagerButtons_;
  var createRows_;
  var createTheHeaderRow_;
  var findNode_;
  var mapping_;
  var options_;
  var parentContainer_;
  var refresh_;
  var removeAllEvents_;
  var result_;
  var rowClickHandler_;
  var setClick_;
  var setTextContent_;
  var swap_;


  //Test Hooks

  beforeEach(function() {
    mapping_ = {};
    options_ = {};
    options_[Current_.Map] = mapping_;

    parentContainer_ = {};
    result_ = {};

    appendChild_ = function() {};
    copyOptions_ = function() {};
    createADiv_ = function() {};
    createARow_ = function() {};
    createPagerButtons_ = function() {};
    createRows_ = function() {};
    createTheHeaderRow_ = function() {};
    findNode_ = function() {};
    refresh_ = function() {};
    removeAllEvents_ = function() {};
    rowClickHandler_ = function() {};
    setClick_ = function() {};
    setTextContent_ = function() {};
    swap_ = function() {};
  });

  //Support Methods
  var callTheMethod_ = function() {
    var methodToCall = src.base.control.gridBuilder.createTheResultHandler(options_, parentContainer_,
                                                                           createTheHeaderRow_, createRows_,
                                                                           createARow_, createADiv_, appendChild_,
                                                                           setTextContent_, refresh_,
                                                                           removeAllEvents_, swap_,
                                                                           setClick_, findNode_,
                                                                           createPagerButtons_, copyOptions_,
                                                                           rowClickHandler_);
    methodToCall(result_);
  };


  //Test Methods

  it('should create the header row.', function() {
    var methodWasCalled = false;

    createTheHeaderRow_ = function(mapping, parentContainer, findNode,
                                   createADiv, setTextContent, appendChild) {
      methodWasCalled = mapping === mapping_ &&
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

    createRows_ = function(result, parentContainer, mapping, findNode, createADiv,
                           appendChild, createARow,  setTextContent, rowClickHandler,
                           setClick) {

      methodWasCalled = result === result_ &&
        parentContainer === parentContainer_ &&
        mapping === mapping_ &&
        findNode === findNode_ &&
        createADiv === createADiv_ &&
        appendChild === appendChild_ &&
        createARow === createARow_ &&
        setTextContent === setTextContent_ &&
        rowClickHandler === rowClickHandler_ &&
        setClick === setClick_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });



  it('should create the pager buttons.', function() {
    var methodWasCalled = false;

    createPagerButtons_ = function(result, options, parentContainer, findNode, createADiv, appendChild,
                                   removeAllEvents, swap, setClick, setTextContent, copyOptions, refresh,
                                   rowClickHandler) {

      methodWasCalled = result === result_ &&
        options === options_ &&
        parentContainer === parentContainer_ &&
        findNode === findNode_ &&
        createADiv === createADiv_ &&
        appendChild === appendChild_ &&
        removeAllEvents === removeAllEvents_ &&
        swap === swap_ &&
        setClick === setClick_ &&
        setTextContent === setTextContent_ &&
        copyOptions === copyOptions_ &&
        refresh === refresh_ &&
        rowClickHandler === rowClickHandler_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });
};


describe('When creating the result handler, it', function() {

  src.test.control.gridBuilder.whenCreatingTheResultHandler.describe();

});
