goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.string');
goog.require('src.base.control.pager');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.events');


goog.provide('src.test.control.pager.whenInitializingAPager');

/**
 @export
 */
src.test.control.pager.whenInitializingAPager.describe = function() {
  //Using
  var Current_ = src.base.control.pager;


  //Fields
  var ParentContainerId_ = goog.string.getRandomString();
  var ParentContainerClass_ = goog.string.getRandomString();

  var appendChild_;
  var createAndAppendPagerButton_;
  var createADiv_;
  var options_;
  var parentContainer_;
  var result_;


  //Test Hooks
  beforeEach(function() {
    parentContainer_ = {};
    result_ = {};

    options_ = {};
    options_[Current_.ContainerClass] = ParentContainerClass_;
    options_[Current_.ContainerId] = ParentContainerId_;

    appendChild_ = function() {};
    createAndAppendPagerButton_ = function() {};

    createADiv_ = function(attributes) {

      switch (attributes['class']) {
      case options_[Current_.ContainerClass]:
        return parentContainer_;
        break;
      default:
        return parentContainer_;
      }

    };
  });


  //Support Methods
  var callTheMethod_ = function() {
    return Current_.initialize(result_, options_,
                               createAndAppendPagerButton_, createADiv_,
                               appendChild_);
  };


  //Test Methods

  it('should create a parent container.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes['id'] === options_[Current_.ContainerId] &&
         attributes['class'] === options_[Current_.ContainerClass]);

      return parentContainer_;
    };
    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the previous button.', function() {
    var methodWasCalled = 0;

    createAndAppendPagerButton_ = function(isPrevious, options, result,
                                           containerRow, findNode, createADiv,
                                           setTextContent, toggleEnabledOnAButton,
                                           removeAllEvents, swap, setClick,
                                           appendChild) {
      methodWasCalled += (isPrevious === true || isPrevious === false) &&
        options === options_ &&
        result === result_ &&
        findNode === goog.dom.findNode &&
        createADiv === src.base.helper.domCreation.div &&
        setTextContent === goog.dom.setTextContent &&
        toggleEnabledOnAButton === src.base.control.pager.toggleEnabledOnAButton &&
        removeAllEvents === goog.events.removeAllremoveAllEvents &&
        swap === goog.dom.classes.swap &&
        setClick === src.base.helper.events.setClick &&
        appendChild === goog.dom.appendChild;
    };
    callTheMethod_();

    expect(methodWasCalled).toBe(2);
  });


  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
};


describe('When initializing an pager, it', function() {
  src.test.control.pager.whenInitializingAPager.describe();
});

