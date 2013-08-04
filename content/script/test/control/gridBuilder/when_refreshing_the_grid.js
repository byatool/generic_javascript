goog.require('goog.dom.classes');
goog.require('goog.events');
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
  var getElementByClass_;
  var grid_;
  var options_;
  var removeNode_;
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
    getElementByClass_ = function() { return [];};
    removeNode_ = function() {};
    setTextContent_ = function() {};
    submitToUrl_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.refresh(options_, grid_, getElementByClass_,
                            removeNode_, createARow_, createADiv_, createResultHandler_,
                            createTheHeaderRow_, createRows_,
                            appendChild_, setTextContent_, submitToUrl_);
  };


  //Test Methods


  it('should find the information rows', function() {
    var methodWasCalled = false;

    getElementByClass_ = function(cssClass, parent) {
      methodWasCalled = methodWasCalled ||
        (parent === grid_ && cssClass === Current_.RowClass);

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
      return cssClass === Current_.RowClass ?  [firstChild, secondChild] : [];
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
        (name === Current_.MessageClass && grid === grid_);
      
      return {};
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should remove an existing no rows message container.', function() {
    var methodWasCalled = false;
    var messageContainer = {};
    
    getElementByClass_ = function(cssClass, parent) {
      return cssClass === Current_.MessageClass ?  [messageContainer] : [];
    };
    
    removeNode_ = function(node) {
      methodWasCalled = methodWasCalled ||
        (node === messageContainer);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the result handler.', function() {
    var methodWasCalled = false;
    
    createResultHandler_ = function(options, parentContainer, createTheHeaderRow,
                                    createRows, createARow, createADiv, appendChild,
                                    setTextContent, removeAllEvents,
                                    swap, setClick, findNode, createPagerButtons) {
      
      methodWasCalled = options === options_ &&
        parentContainer === grid_ &&
        createTheHeaderRow === createTheHeaderRow_ &&
        createRows === createRows_ &&
        createARow === createARow_ &&
        createADiv === createADiv_ &&
        appendChild === appendChild_ &&
        removeAllEvents === goog.events.removeAll &&
        swap === goog.dom.classes.swap &&
        setClick === src.base.helper.events.setClick &&
        findNode === goog.dom.findNode &&
        createPagerButtons === src.base.control.gridBuilder.createPagerButtons;
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
