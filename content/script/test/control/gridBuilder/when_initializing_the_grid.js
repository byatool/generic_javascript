goog.require('goog.string');
goog.require('src.base.control.buttonList');

goog.provide('src.test.control.gridBuilder.whenInitializingTheGrid');

/**
 @export
 */
src.test.control.gridBuilder.whenInitializingTheGrid.describe = function() {
  //Using
  
  var Current_ = src.base.control.gridBuilder;
  
  
  //Fields
  
  var ContainerClass_ = goog.string.getRandomString();
  var ContainerId_ = goog.string.getRandomString();
  
  var options_;
  var parentContainer_;
  
  var createADiv_;
  var createARow_;
  var createResultHandler_;
  var createTheHeaderRow_;
  var createRows_;
  var appendChild_;
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
    
    appendChild_ = function() {};
    createADiv_ = function() { return parentContainer_; };
    createARow_ = function() {};
    createResultHandler_ = function() {};
    createTheHeaderRow_ = function() {};
    createRows_ = function() {};
    setTextContent_ = function() {};
    submitToUrl_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(options_, createARow_, createADiv_, createResultHandler_,
                               createTheHeaderRow_, createRows_, appendChild_, setTextContent_,
                               submitToUrl_);
  };

  
  //Test Methods

  it('should create the container div.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = attributes['id'] === ContainerId_ &&
        attributes['class'] === ContainerClass_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should return the container div.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });



  it('should create the result handler.', function() {
    var methodWasCalled = false;

    createResultHandler_ = function(options, parentContainer, createTheHeaderRow, createRows, createARow,
                                    createADiv, appendChild, setTextContent, refresh, setClick,
                                    createPagerButtons, copyOptions) {
      
      methodWasCalled = options === options_ &&
        parentContainer === parentContainer_ &&
        createTheHeaderRow === createTheHeaderRow_ &&
        createRows === createRows_ &&
        createARow === createARow_ &&
        createADiv === createADiv_ &&
        appendChild === appendChild_ &&
        setTextContent === setTextContent_ &&
        refresh === src.base.control.gridBuilder.refresh &&
        setClick === src.base.helper.events.setClick &&
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


describe('When initializing the grid, it', function() {
  src.test.control.gridBuilder.whenInitializingTheGrid.describe();
});
