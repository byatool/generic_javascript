goog.require('goog.string');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.control.zippyContainer');
goog.require('src.base.control.zippyGrid');

goog.provide('src.test.control.zippyGrid.whenInitializingTheZippyGrid');


/**
 @export
 */
src.test.control.zippyGrid.whenInitializingTheZippyGrid.describe = function() {
  
  //Using
  
  var Current_ = src.base.control.zippyGrid;
  var GridBuilder_ = src.base.control.gridBuilder.constant;
  var Zippy_ = src.base.control.zippyContainer;
  
  
  //Fields
  
  var ContainerId_ = goog.string.getRandomString();
  var Url_ = goog.string.getRandomString();
  var WorkId_ = goog.string.getRandomString();
  var ZippyTitle_ = goog.string.getRandomString();
  
  var createARow_;
  var createGrid_;
  var createZippyContainer_;
  var handleParameters_;
  var options_;
  var onRowClick_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    options_ = {};
    options_[Current_.ZippyContainerId] = ContainerId_;
    options_[Current_.ZippyTitle] = ZippyTitle_;
    
    createARow_ = function() {};
    createGrid_ = function() {};
    createZippyContainer_ = function() {};
    onRowClick_ = function() {};
    handleParameters_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(options_,
                               Url_,
                               handleParameters_,
                               createARow_,
                               onRowClick_,
                               createGrid_,
                               createZippyContainer_);
  };
  
  
  //Test Methods
  
  it('should create the grid with the correct options.', function() {
    var methodWasCalled = false;
    
    createGrid_ = function(options) {
      methodWasCalled = options[GridBuilder_.ContainerClass] === Current_.ContentContainerClass &&
        options[GridBuilder_.ContainerId] === Current_.ContentContainerClass &&
        options[GridBuilder_.Url] === Url_ &&
        options[GridBuilder_.CreateARow] === createARow_ &&
        options[GridBuilder_.ShowHeader] === false &&
        options[GridBuilder_.RowClickHandler] === onRowClick_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the grid parameters.', function() {
    var methodWasCalled = false;

    handleParameters_ = function(options) {
      methodWasCalled = options === options_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the grid with the correct parameters.', function() {
    var methodWasCalled = false;
    var createdParameters = {};

    handleParameters_ = function() {
      return createdParameters;
    };

    createGrid_ = function(options) {
      methodWasCalled = options[GridBuilder_.Parameters] === createdParameters;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the grid with the correct mapping.', function() {
    var methodWasCalled = false;

    createGrid_ = function(options) {
      methodWasCalled = options[GridBuilder_.Map][0]['headerText'] === '' &&
        options[GridBuilder_.Map][0]['propertyName'] === '' &&
        options[GridBuilder_.Map][0]['class'] === '';
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should add the created grid options to the overall options.', function() {
    var methodWasCalled = false;
    
    callTheMethod_();
    
    expect(options_[Current_.ZippyContainerId + 'Options']).toNotBe(undefined);
  });
  
  
  it('should create the parent zippy container.', function() {
    var methodWasCalled = false;
    var grid = {};
    
    createGrid_ = function() {
      return grid;
    };
    
    createZippyContainer_ = function(options, child) {
      methodWasCalled = options[Zippy_.Title] === ZippyTitle_ &&
        options[Zippy_.ContainerId] === ContainerId_ &&
        child === grid;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the zippy container.', function() {
    var methodWasCalled = false;
    var createdZippy = {};
    
    createZippyContainer_ = function(zippyOptions, contentContainer) {
      return createdZippy;
    };
    
    expect(callTheMethod_()).toBe(createdZippy);
  });
  
};


describe('When initializing a zippy grid, it', function() {
  src.test.control.zippyGrid.whenInitializingTheZippyGrid.describe();
});
