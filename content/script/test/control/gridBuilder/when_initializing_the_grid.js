goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.string');
goog.require('src.base.control.buttonList');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder.constant');

goog.provide('src.test.control.gridBuilder.whenInitializingTheGrid');


/**
 @export
 */
src.test.control.gridBuilder.whenInitializingTheGrid.describe = function() {
  
  //Using
  
  var Constant_ = src.base.control.gridBuilder.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.gridBuilder;
  
  
  //Fields
  
  var ContainerClass_ = goog.string.getRandomString();
  var ContainerId_ = goog.string.getRandomString();
  
  var appendChild_;
  var createADiv_;
  var createGridRefresh_;
  var createResultHandler_;
  var createRows_;
  var createTheHeaderRow_;
  var parentContainer_;
  var options_;
  var setTextContent_;
  var submitToUrl_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    options_ = {};
    options_[Constant_.ContainerClass] = ContainerClass_;
    options_[Constant_.ContainerId] = ContainerId_;
    options_[Constant_.Parameters] = {};
    options_[Constant_.Url] = 'asdfsd';
     //options_[Current_.Map] = [];
    
    appendChild_ = function() {};
    createADiv_ = function() { return parentContainer_; };
    createGridRefresh_ = function(){};
    createResultHandler_ = function() {};
    createTheHeaderRow_ = function() {};
    createRows_ = function() {};
    setTextContent_ = function() {};
    submitToUrl_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(options_, createADiv_, createResultHandler_,
                               createTheHeaderRow_, createRows_, appendChild_, setTextContent_,
                               submitToUrl_, createGridRefresh_);
  };
  
  
  //Test Methods
  
  it('should create the container div.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = Constant_.ContainerId !== undefined &&
        Constant_.ContainerClass !== undefined &&
        attributes[ControlConstant_.Id] === ContainerId_ &&
        attributes[ControlConstant_.Class] === ContainerClass_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the container div.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
  
  
  
  it('should create the grid refresh.', function() {
    var methodWasCalled = false;
    
    createGridRefresh_ = function(options, grid, refreshMethod){
      methodWasCalled = grid === parentContainer_ &&
        options === options_ &&
        refreshMethod === src.base.control.gridBuilder.refresh;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the result handler.', function() {
    var methodWasCalled = false;
    var createdGridRefresh = {};
    
    createGridRefresh_ = function(){
      return createdGridRefresh;
    };
    
    createResultHandler_ = function(options, parentContainer, createTheHeaderRow,
                                    createRows, createADiv, appendChild,
                                    setTextContent, removeAllEvents,
                                    swap, setClick, findNode, createPagerButtons,
                                    gridRefresh) {
      
      methodWasCalled = options === options_ &&
        parentContainer === parentContainer_ &&
        createTheHeaderRow === createTheHeaderRow_ &&
        createRows === createRows_ &&
        createADiv === createADiv_ &&
        appendChild === appendChild_ &&
        setTextContent === setTextContent_ &&
        removeAllEvents === goog.events.removeAll && //Unneeded?
        swap === goog.dom.classes.swap &&
        setClick === src.base.helper.events.setClick &&
        findNode === goog.dom.findNode &&
        createPagerButtons === src.base.control.gridBuilder.createPagerButtons &&
        gridRefresh === createdGridRefresh;
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
      methodWasCalled =  Constant_.Url !== undefined &&
        Constant_.Parameters !== undefined &&
        url === options_[Constant_.Url] &&
        parameters === options_[Constant_.Parameters] &&
        handler === resultHandler;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When initializing the grid, it', function() {
  src.test.control.gridBuilder.whenInitializingTheGrid.describe();
});
