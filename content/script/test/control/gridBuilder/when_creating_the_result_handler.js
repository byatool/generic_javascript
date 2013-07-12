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
  var result_;
  var setClick_;
  var setTextContent_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    mapping_ = {};
    options_ = {};
    options_[Current_.Map] = mapping_;
    
    parentContainer_ = {};
    result_ = {};
    
    appendChild_ = function() {};
    copyOptions_ = function(){};
    createADiv_ = function() {};
    createARow_ = function() {};
    createPagerButtons_ = function() {};
    createRows_ = function() {};
    createTheHeaderRow_ = function() {};
    findNode_ = function(){};
    refresh_ = function(){};
    setClick_ = function(){};
    setTextContent_ = function() {};
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return src.base.control.gridBuilder.createTheResultHandler(options_, parentContainer_, createTheHeaderRow_,
                                                               createRows_, createARow_, createADiv_, appendChild_,
                                                               setTextContent_, refresh_, setClick_,
                                                               findNode_, createPagerButtons_, copyOptions_)
    (result_);
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

  
  
  it('should create the pager buttons.', function() {
    var methodWasCalled = false;
    
    createPagerButtons_ = function(result, options, parentContainer, findNode, createADiv, appendChild, setClick,
                                   setTextContent, copyOptions, refresh) {
      methodWasCalled = result === result_ &&
        options === options_ &&
        parentContainer === parentContainer_ &&
        findNode === findNode_ &&
        createADiv === createADiv_ &&
        appendChild === appendChild_ &&
        setClick === setClick_ &&
        setTextContent === setTextContent_ &&
        copyOptions === copyOptions_ &&
        refresh === refresh_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When creating the result handler, it', function() {

  src.test.control.gridBuilder.whenCreatingTheResultHandler.describe();

});
