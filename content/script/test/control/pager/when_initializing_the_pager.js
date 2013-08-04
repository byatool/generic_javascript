goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.object');
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

  var createAndAppendPagerButton_;
  var createADiv_;
  var options_;
  var pagerOptions_;
  var parentContainer_;
  var result_;


  //Test Hooks
  beforeEach(function() {
    parentContainer_ = null;
    result_ = {};

    options_ = {};


    pagerOptions_ = {};
    pagerOptions_[Current_.ContainerClass] = ParentContainerClass_;
    pagerOptions_[Current_.ContainerId] = ParentContainerId_;

    createAndAppendPagerButton_ = function() {};

    createADiv_ = function(attributes) {
      parentContainer_ = {};
      return parentContainer_;
    };
    
  });


  //Support Methods
  var callTheMethod_ = function() {
    return Current_.initialize(result_, options_, pagerOptions_,
                               parentContainer_, createAndAppendPagerButton_,
                               createADiv_);
  };


  //Test Methods

  it('should create a parent container.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes['id'] === pagerOptions_[Current_.ContainerId] &&
         attributes['class'] === pagerOptions_[Current_.ContainerClass]);

      return parentContainer_;
    };
    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should not create the container if it is not null.', function() {
    var methodWasCalled = false;
    parentContainer_ = {};

    createADiv_ = function() {
      methodWasCalled = true;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(false);
  });


  it('should create the previous and nextbutton.', function() {
    var methodWasCalled = 0;

    createAndAppendPagerButton_ = function(isPrevious, options, pagerOptions,
                                           result, containerRow, findNode,
                                           createADiv, setTextContent,
                                           toggleEnabledOnAButton, removeAllEvents,
                                           swap, setClick, appendChild, clone) {
      
      methodWasCalled += (isPrevious === true || isPrevious === false) &&
        options === options_ &&
        pagerOptions === pagerOptions_ &&
        result === result_ &&
        findNode === goog.dom.findNode &&
        createADiv === createADiv_ &&
        setTextContent === goog.dom.setTextContent &&
        toggleEnabledOnAButton === src.base.control.pager.toggleEnabledOnAButton &&
        removeAllEvents === goog.events.removeAll &&
        swap === goog.dom.classes.swap &&
        setClick === src.base.helper.events.setClick &&
        appendChild === goog.dom.appendChild &&
        clone === goog.object.clone;
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

