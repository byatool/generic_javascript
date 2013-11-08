goog.require('src.base.control.gridBuilder');
goog.require('src.base.control.pager');


goog.provide('src.test.control.gridBuilder.whenCreatingTheResultHandler');

/**
 @export
 */
src.test.control.gridBuilder.whenCreatingTheResultHandler.describe = function() {
  
  //Using
  
  var Constant_ = src.base.control.gridBuilder.constant;
  var Current_ = src.base.control.gridBuilder;
  
  
  //Fields
  var appendChild_;
  var createADiv_;
  var createPagerButtons_;
  var createRows_;
  var createTheHeaderRow_;
  var getElementByClass_;
  var mapping_;
  var options_;
  var parentContainer_;
  var refreshGrid_;
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
    createPagerButtons_ = function() {};
    createRows_ = function() {};
    createTheHeaderRow_ = function() {};
    getElementByClass_ = function() {};
    refreshGrid_ = function(){};
    
    setClick_ = function() {};
    setTextContent_ = function() {};
    swap_ = function() {};
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    var methodToCall =
          src.base.control.gridBuilder.createTheResultHandler(options_, parentContainer_,
                                                              createTheHeaderRow_, createRows_,
                                                              createADiv_, appendChild_,
                                                              setTextContent_, swap_, setClick_,
                                                              getElementByClass_, createPagerButtons_,
                                                              refreshGrid_);
    methodToCall(result_);
  };
  
  
  //Test Methods
  
  it('should create the header row.', function() {
    var methodWasCalled = false;
    
    createTheHeaderRow_ = function(options, parentContainer) {
      methodWasCalled = options === options_ &&
        parentContainer === parentContainer_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the rows.', function() {
    var methodWasCalled = false;
    
    createRows_ = function(result, parentContainer, options, createARow,
                           refreshGrid) {
      
      methodWasCalled = result === result_ &&
        parentContainer === parentContainer_ &&
        options === options_ &&
        createARow === Current_.row.createARow &&
        refreshGrid === refreshGrid_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the rows with the optional createARow method.', function() {
    var methodWasCalled = false;
    options_[Constant_.CreateARow] = {};
    
    createRows_ = function(result, parentContainer, options, createARow,
                           refreshGrid) {
      
      methodWasCalled = Constant_.CreateARow !== undefined &&
        result === result_ &&
        parentContainer === parentContainer_ &&
        options === options_ &&
        createARow === options_[Constant_.CreateARow] &&
        refreshGrid === refreshGrid_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should create the pager buttons.', function() {
    var methodWasCalled = false;
    
    createPagerButtons_ = function(result, gridOptions, parentContainer,
                                   getElementByClass, initializeThePager, appendChild,
                                  refreshGrid) {
      
      methodWasCalled = result === result_ &&
        gridOptions === options_ &&
        parentContainer === parentContainer_ &&
        getElementByClass === getElementByClass_ &&
        appendChild === appendChild_ &&
        initializeThePager === src.base.control.pager.initialize &&
        refreshGrid === src.base.control.gridBuilder.refresh;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });
};


describe('When creating the result handler, it', function() {

  src.test.control.gridBuilder.whenCreatingTheResultHandler.describe();

});
