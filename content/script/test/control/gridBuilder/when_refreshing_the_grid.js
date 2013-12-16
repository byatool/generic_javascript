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
  var forEach_;
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
    forEach_ = function(){};
    getElementByClass_ = function() { return [];};
    removeNode_ = function() {};
    setTextContent_ = function() {};
    submitToUrl_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.refresh(options_, grid_, getElementByClass_,
                            forEach_, removeNode_, createADiv_, createResultHandler_,
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
    var children = {};
    var item = {};
    
    getElementByClass_ = function(cssClass, parent) {
      return cssClass === Constant_.RowClass ?  children : [];
    };
    
    removeNode_ = function(node) {
      methodWasCalled += node === item;
    };
    
    forEach_ = function(list, toDo){
      if(methodWasCalled === 0){
        methodWasCalled += list === children;
        toDo(item);
      }
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
    var methodWasCalled = 0;
    var messageContainer = {};
    var item = {};
    
    getElementByClass_ = function(cssClass, parent) {
      return cssClass === Constant_.MessageClass ?  messageContainer : {};
    };
    
    forEach_ = function(list, toDo){
      methodWasCalled += list === messageContainer;
      
      if(methodWasCalled !== 0){
        toDo(item);
      }
    };
    
    removeNode_ = function(node) {
      methodWasCalled += node === item;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
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
                                    setTextContent, swap, setClick, getElementByClass,
                                    createPagerButtons,
                                    gridRefresh) {
      
      methodWasCalled = options === options_ &&
        parentContainer === grid_ &&
        createTheHeaderRow === src.base.control.gridBuilder.header.createTheHeaderRow &&
        createRows === src.base.control.gridBuilder.row.createRows &&
        createADiv === createADiv_ &&
        appendChild === appendChild_ &&
        swap === goog.dom.classes.swap &&
        setClick === src.base.helper.events.setClick &&
        getElementByClass === goog.dom.getElementByClass &&
        createPagerButtons === src.base.control.gridBuilder.createPagerButtons &&
        gridRefresh === createdGridRefresh;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should retrieve the information.', function() {
    var methodWasCalled = false;
    var resultHandler = {};
    
    var currentMainParameter = goog.string.getRandomString();
    options_[Constant_.MainParameter] = currentMainParameter;
     
    createResultHandler_ = function() {
      return resultHandler;
    };
    
    submitToUrl_ = function(url, mainParameter, parameters, handler) {
      methodWasCalled = url === options_[Constant_.Url] &&
        mainParameter ===  currentMainParameter &&
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
