goog.require('goog.string');
goog.require('src.base.control.buttonList');

goog.provide('src.test.control.gridBuilder.whenRefreshingTheGrid');

/**
 @export
 */
src.test.control.gridBuilder.whenRefreshingTheGrid.describe = function() {
  //Using

  var Current_ = src.base.control.gridBuilder;


  //Fields

  var ContainerClass_ = goog.string.getRandomString();
  var ContainerId_ = goog.string.getRandomString();

  var appendChild_;
  var createADiv_;
  var createARow_;
  var createResultHandler_;
  var createRows_;
  var createTheHeaderRow_;
  var grid_;
  var options_;
  var removeChildren_;
  var setTextContent_;
  var submitToUrl_;


  //Test Hooks

  beforeEach(function() {
    options_ = {};
    options_[Current_.ContainerClass] = ContainerClass_;
    options_[Current_.ContainerId] = ContainerId_;
    options_[Current_.Url] = 'asdfsd';
    options_[Current_.Parameters] = {};
    options_[Current_.Map] = [];

    grid_ = {};

    appendChild_ = function() {};
    createADiv_ = function() {};
    createARow_ = function() {};
    createResultHandler_ = function() {};
    createTheHeaderRow_ = function() {};
    createRows_ = function() {};
    removeChildren_ = function() {};
    setTextContent_ = function() {};
    submitToUrl_ = function() {};
  });


  //Support Methods

  var callTheMethod_ = function() {
    return Current_.refresh(options_, grid_, removeChildren_, createARow_, createADiv_, createResultHandler_,
                               createTheHeaderRow_, createRows_, appendChild_, setTextContent_,
                               submitToUrl_);
  };
  
  
  //Test Methods
  
  
  
  it('should remove all rows..', function() {
    var methodWasCalled = false;
    
    removeChildren_ = function(parent) {
      methodWasCalled = parent === grid_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the result handler.', function() {
    var methodWasCalled = false;
    
    createResultHandler_ = function(options, parentContainer, createTheHeaderRow, createRows, createARow,
                                    createADiv, appendChild, setTextContent, refresh, setClick,
                                    findNode, createPagerButtons, copyOptions) {
      
      methodWasCalled = options === options_ &&
        parentContainer === grid_ &&
        createTheHeaderRow === createTheHeaderRow_ &&
        createRows === createRows_ &&
        createARow === createARow_ &&
        createADiv === createADiv_ &&
        appendChild === appendChild_ &&
        refresh === src.base.control.gridBuilder.refresh &&
        setClick === src.base.helper.events.setClick &&
        findNode === goog.dom.findNode &&
        createPagerButtons === src.base.control.gridBuilder.createPagerButtons &&
        copyOptions === src.base.control.gridBuilder.copyOptions;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should retrieve the information.', function() {
    var methodWasCalled = false;
    
    var resultHandler = {};
    
    createResultHandler_ = function() {
      return resultHandler;
    };
    
    submitToUrl_ = function(url, parameters, handler) {
      methodWasCalled = url === options_[Current_.Url] &&
        parameters === options_[Current_.Parameters] &&
        handler === resultHandler;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When refreshing the grid, it', function() {
  src.test.control.gridBuilder.whenRefreshingTheGrid.describe();
});
