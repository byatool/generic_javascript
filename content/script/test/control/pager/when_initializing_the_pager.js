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
  
  var appendChild_;
  var createAndAppendPagerButton_;
  var createAPagerNumberContainer_; 
  var createAClearDiv_;
  var createADiv_;
  var getElementByClass_;
  var options_;
  var pagerOptions_;
  var parentContainer_;
  var removeNode_;
  var result_;
  
  
  //Test Hooks
  beforeEach(function() {
    parentContainer_ = null;
    result_ = {};
    
    options_ = {};
    
    pagerOptions_ = {};
    pagerOptions_[Current_.ContainerClass] = ParentContainerClass_;
    pagerOptions_[Current_.ContainerId] = ParentContainerId_;
    
    createADiv_ = function(attributes) {
      parentContainer_ = {};
      return parentContainer_;
    };
    
    appendChild_ = function() {};
    createAndAppendPagerButton_ = function() {};
    createAPagerNumberContainer_ = function() {};
    createAClearDiv_ = function(){};
    getElementByClass_ = function(){ return [];};
    removeNode_ = function(){};
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.initialize(result_, options_, pagerOptions_,
                               parentContainer_, createAndAppendPagerButton_,
                               createAPagerNumberContainer_, createADiv_,
                               getElementByClass_, removeNode_,
                               createAClearDiv_, appendChild_);
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
                                           swap, setClick, appendChild, clone,
                                           cloneOptions) {
      
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
        appendChild === appendChild_ &&
        clone === goog.object.clone &&
        cloneOptions === Current_.cloneOptions;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should create the button container.', function() {
    var methodWasCalled = false;
    
    createAPagerNumberContainer_ = function(
      result,
      options,
      pagerOptions,
      pagerContainer,
      findNode,
      createADiv,
      appendChild,
      findNodes,
      every,
      removeNode,
      createAPagerNumberButton,
      createAClearDiv){
      
      methodWasCalled = result === result_ &&
        options === options_ &&
        pagerOptions === pagerOptions_ &&
        pagerContainer === parentContainer_ &&
        findNode === goog.dom.findNode &&
        createADiv === createADiv_ &&
        appendChild === appendChild_ &&
        findNodes === goog.dom.findNodes &&
        every === goog.array.every &&
        removeNode === removeNode_ &&
        createAPagerNumberButton === src.base.control.pager.createAPagerNumberButton &&
        createAClearDiv === createAClearDiv_;
    };
    
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should search for the clear div.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(cssClass, parent){
      methodWasCalled = parent === parentContainer_ &&
        cssClass === 'clearBoth';
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should remove the existing clear div.', function() {
    var methodWasCalled = false;
    var clearNode = {};
    
    getElementByClass_ = function(){
      return clearNode;
    };
    
    removeNode_ = function(node){
      methodWasCalled = node === clearNode;
    };
     
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should create a clear div.', function() {
    var methodWasCalled = false;
    
    createAClearDiv_ = function() {
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should add the clear div.', function() {
    var methodWasCalled = false;
    var clearDiv = {};
    
    createAClearDiv_ = function() {
      return clearDiv;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === clearDiv);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
};


describe('When initializing an pager, it', function() {
  src.test.control.pager.whenInitializingAPager.describe();
});

