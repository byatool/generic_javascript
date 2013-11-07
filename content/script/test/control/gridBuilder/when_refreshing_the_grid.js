goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.string');
goog.require('src.base.control.buttonList');
goog.require('src.base.control.gridBuilder');
goog.require('src.base.control.gridBuilder.constant');


goog.provide('src.test.control.gridBuilder.whenRefreshingTheGrid');

/**
 @export
 */
src.test.control.gridBuilder.whenRefreshingTheGrid.describe = function() {

  //Using
  
  var Constant_ = src.base.control.gridBuilder.constant;
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
  var getElementByClass_;
  var grid_;
  var options_;
  var removeNode_;
  var setTextContent_;
  var submitToUrl_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    options_ = {};
    options_[Constant_.ContainerClass] = ContainerClass_;
    options_[Constant_.ContainerId] = ContainerId_;
    options_[Constant_.Url] = 'asdfsd';
    options_[Constant_.Parameters] = {};
    options_[Constant_.Map] = [];
    
    grid_ = {};
    
    appendChild_ = function() {};
    createADiv_ = function() {};
    createGridRefresh_ = function() {};
    createResultHandler_ = function() {};
    createTheHeaderRow_ = function() {};
    createRows_ = function() {};
    getElementByClass_ = function() { return [];};
    removeNode_ = function() {};
    setTextContent_ = function() {};
    submitToUrl_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.refresh(options_, grid_, getElementByClass_,
                            removeNode_, createADiv_, createResultHandler_,
                            createTheHeaderRow_, createRows_,
                            appendChild_, setTextContent_, submitToUrl_,
                            createGridRefresh_);
  };
  
  
  //Test Methods
  
  
  it('should find the information rows', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(cssClass, parent) {
      methodWasCalled = methodWasCalled ||
        (Constant_.RowClass !== undefined &&
         parent === grid_ &&
         cssClass === Constant_.RowClass);
      
      return [];
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should remove all the information rows.', function() {
    var methodWasCalled = 0;
    var firstChild = {};
    var secondChild = {};
    
    getElementByClass_ = function(cssClass, parent) {
      return cssClass === Constant_.RowClass ?  [firstChild, secondChild] : [];
    };
     
    removeNode_ = function(node) {
      methodWasCalled += node === firstChild || node === secondChild;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should find an existing no rows message container.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(name, grid){
      methodWasCalled = methodWasCalled ||
        (Constant_.MessageClass !== undefined &&
         name === Constant_.MessageClass && 
         grid === grid_);
      
      return {};
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should remove an existing no rows message container.', function() {
    var methodWasCalled = false;
    var messageContainer = {};
    
    getElementByClass_ = function(cssClass, parent) {
      return cssClass === Constant_.MessageClass ?  [messageContainer] : [];
    };
    
    removeNode_ = function(node) {
      methodWasCalled = methodWasCalled ||
        (node === messageContainer);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the grid refresh.', function() {
    var methodWasCalled = false;
    
    createGridRefresh_ = function(options, grid, refreshMethod){
      methodWasCalled = grid === grid_ &&
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
        parentContainer === grid_ &&
        createTheHeaderRow === createTheHeaderRow_ &&
        createRows === createRows_ &&
        createADiv === createADiv_ &&
        appendChild === appendChild_ &&
        removeAllEvents === goog.events.removeAll &&
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
      methodWasCalled = url === options_[Constant_.Url] &&
        parameters === options_[Constant_.Parameters] &&
        handler === resultHandler;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When refreshing the grid, it', function() {
  src.test.control.gridBuilder.whenRefreshingTheGrid.describe();
});
