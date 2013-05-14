goog.require('goog.string');
goog.require('src.base.control.simpleInformationDisplay');

goog.provide('src.test.control.simpleInformationDisplay.whenInitializingASimpleInformationDisplay');

/**
 @export
 */
src.test.control.simpleInformationDisplay.whenInitializingASimpleInformationDisplay.describe = function() {
  //Using

  var Current = src.base.control.simpleInformationDisplay;


  //Fields

  var ParentContainerClass_ = goog.string.getRandomString();
  var ParentContainerId_ = goog.string.getRandomString();
  var Url_ = goog.string.getRandomString();

  var appendChild_;
  var containerDiv_;
  var createADiv_;
  var createAHidden_;
  var createLayoutItem_;
  var createTheCallBack_;
  var fillTheRows_;
  var layoutItems_;
  var options_;
  var parameters_;
  var parentContainer_;
  var submitData_;


  //Test Hooks
  beforeEach(function() {
    options_ = {};
    parameters_ = {};
    parentContainer_ = {};

    options_[Current.ContainerId] = ParentContainerId_;
    options_[Current.ContainerClass] = ParentContainerClass_;

    layoutItems_ = [{'userName': 'Username:'}, {'password': 'Password'}];
    options_[Current.LayoutItems] = layoutItems_;

    containerDiv_ = {};

    appendChild_ = function() {};
    createADiv_ = function() { return containerDiv_; };
    createLayoutItem_ = function() { return {}; };
    createTheCallBack_ = function() {};
    fillTheRows_ = function() {};
    submitData_ = function() {};
  });


  //Support Methods
  var callTheMethod_ = function() {
    return Current.initialize(Url_, parameters_, options_, createADiv_, createLayoutItem_, appendChild_,
                              createTheCallBack_, submitData_, fillTheRows_);
  };


  //Test Methods

  it('should create a parent container.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = attributes['id'] === options_[Current.ContainerId] &&
        attributes['class'] === options_[Current.ContainerClass];
      return parentContainer_;
    };
    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  //createAHidden === createAHidden_ &&
  it('should create a layout row for each item.', function() {
    var methodWasCalled = 0;

    createLayoutItem_ = function(item, options, createADiv, createAHidden, appendChild) {
      methodWasCalled += options === options_ &&
        createADiv === createADiv_ &&
        (item === layoutItems_[0] || item === layoutItems_[1]);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(2);
  });


  it('should append each created row.', function() {
    var callCount = 0;
    var firstItem = {};
    var methodWasCalled = 0;
    var secondItem = {};

    createLayoutItem_ = function() {
      callCount += 1;
      return callCount < 2 ? firstItem : secondItem;
    };

    appendChild_ = function(parentContainer, item) {
      methodWasCalled += parentContainer === containerDiv_ &&
        (item === firstItem || item === secondItem);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(2);
  });


  it('should create the result handling method.', function() {
    var methodWasCalled = false;

    createTheCallBack_ = function(container, methodToUse) {
      methodWasCalled = container === containerDiv_ &&
        methodToUse === fillTheRows_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should call to retrieve the information, and update the container.', function() {
    var methodWasCalled = false;
    var finalMethod = {};

    createTheCallBack_ = function() {
      return finalMethod;
    };

    submitData_ = function(url, parameters, fillTheList) {
        methodWasCalled = url === Url_ &&
          parameters === parameters_ &&
        fillTheList === finalMethod;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

  it('should return the container.', function() {
    expect(callTheMethod_()).toBe(containerDiv_);
  });

};


describe('When initializing a simpleInformationDisplay, it', function() {
  src.test.control.simpleInformationDisplay.whenInitializingASimpleInformationDisplay.describe();
});
