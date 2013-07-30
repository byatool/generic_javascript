goog.require('goog.string');
goog.require('src.base.control.zippyContainer');

goog.provide('src.test.control.zippyContainer.whenInitializingAZippyContainer');

/**
 @export
 */
src.test.control.zippyContainer.whenInitializingAZippyContainer.describe = function() {

  //Using
  var Current_ = src.base.control.zippyContainer;


  //Fields
  var HeaderText_ = goog.string.getRandomString();
  var ParentContainerId_ = goog.string.getRandomString();

  var appendChild_;
  var contentContainer_;
  var createADiv_;
  var createAClearDiv_;
  var createAZippy_;
  var header_;
  var headerExpand_;
  var headerTitle_;
  var options_;
  var parentContainer_;
  var setTextContent_;
  var titleContainer_;
  var toHold_;


  //Test Hooks
  beforeEach(function() {
    contentContainer_ = {};
    header_ = {};
    headerExpand_ = {};
    headerTitle_ = {};
    parentContainer_ = {};
    titleContainer_ = {};
    toHold_ = {};

    options_ = {};
    options_[Current_.ContainerId] = ParentContainerId_;
    options_[Current_.Title] = HeaderText_;

    createADiv_ = function(attributes) {
      switch (attributes['class']) {
      case ParentContainerId_:
        return parentContainer_;
        break;
      case Current_.ContentContainerClass:
        return contentContainer_;
        break;
      case Current_.HeaderClass:
        return header_;
        break;
      case Current_.HeaderExpandClass:
        return headerExpand_;
        break;
      case Current_.HeaderTitleClass:
        return headerTitle_;
        break;
      default:
        return {};
      }
    };

    appendChild_ = function() {};
    createAClearDiv_ = function() { return {}; };
    createAZippy_ = function() {};
    setTextContent_ = function() {};
  });


  //Support Methods
  var callTheMethod_ = function() {
    return Current_.initialize(options_, toHold_, createADiv_,
                               appendChild_, setTextContent_,
                               createAClearDiv_, createAZippy_);
  };


  //Test Methods

  it('should create a parent container.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes['id'] === options_[Current_.ContainerId] &&
         attributes['class'] === options_[Current_.ContainerId]);

      return parentContainer_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });


  it('should create the header.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        attributes['class'] === Current_.HeaderClass;
      return {};
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });



  it('should create the title div.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        attributes['class'] === Current_.HeaderTitleClass;

      return {};
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

  it('should set the header text.', function() {
    var methodWasCalled = false;

    setTextContent_ = function(element, text) {
      methodWasCalled = methodWasCalled ||
        (element === headerTitle_ && text === HeaderText_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should add the header title to the header.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === header_ && child === headerTitle_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the expand button.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes['class'] === Current_.HeaderExpandClass &&
         attributes['id'] === Current_.HeaderExpandClass);

      return {};
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should add the expand button to the header.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === header_ && child === headerExpand_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create a clear div.', function() {
    var methodWasCalled = false;

    createAClearDiv_ = function() {
      methodWasCalled = methodWasCalled ||
        true;
      return {};
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

  it('should add the clear div to the header.', function() {
    var methodWasCalled = false;
    var clearDiv = {};

    createAClearDiv_ = function() {
      return clearDiv;
    };

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === header_ && child === clearDiv);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should add the header to the parent container.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === parentContainer_ && child === header_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the content holder.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes['class'] === Current_.ContentContainerClass &&
         attributes['id'] === Current_.ContentContainerClass);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should append the passed in control to the content container.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === contentContainer_ && child === toHold_);
    };
    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should append the content container to the parent container.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === parentContainer_ && child === contentContainer_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create, and attach the zippy.', function() {
    var methodWasCalled = false;

    createAZippy_ = function(eventHolder, toToggle) {
      methodWasCalled = methodWasCalled ||
        (eventHolder === headerExpand_ &&
         toToggle === contentContainer_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });
};


describe('When initializing an zippyContainer, it', function() {
  src.test.control.zippyContainer.whenInitializingAZippyContainer.describe();
});






