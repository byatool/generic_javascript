goog.require('goog.string');
goog.require('src.base.control.gridBuilder');

goog.provide('src.test.control.gridBuilder.whenCreatingThePagerButtons');

/**
  @export
 */
src.test.control.gridBuilder.whenCreatingThePagerButtons.describe = function() {

  //Using
  
  var Current_ = src.base.control.gridBuilder;
  var NextPage_ = goog.string.getRandomString();
  var PreviousPage_ = goog.string.getRandomString();
  
  
  //Fields
  
  var appendChild_;
  var buttonsCreated_;
  var copyOptions_;
  var createADiv_;
  var nextButton_;
  var nextOptions_;
  var options_;
  var parentContainer_;
  var previousButton_;
  var previousOptions_;
  var refresh_;
  var result_;
  var setClick_;
  var setTextContent_;
  
  
  //Test Hooks

  
  
  beforeEach(function() {
    result_ = {};
    result_['PreviousPage'] = PreviousPage_;
    result_['NextPage'] = NextPage_;
    
    options_ = {};
    nextButton_ = {'id':'next'};
    previousButton_ = {'id':'previous'};

    buttonsCreated_ = 0;
    
    createADiv_ = function() {
      if (buttonsCreated_ === 0) {
        buttonsCreated_ += 1;
        return previousButton_;
      }
      else {
        return nextButton_;
      }
    };
    
    
    nextOptions_ = {'id':'next'};
    previousOptions_ = {'id':'previous'};
    
    copyOptions_ = function(options, pageNumber) {
      return pageNumber === PreviousPage_ ? previousOptions_ : nextOptions_;
    };
    
    appendChild_ = function() {};
    refresh_ = function(a) {};
    setClick_ = function(){};
    setTextContent_ = function(){};
    
  });
  
  //Support Methods
  
  var callTheMethod_ = function() {
    src.base.control.gridBuilder.createPagerButtons(result_, options_, parentContainer_,
                                                    createADiv_, appendChild_, setClick_,
                                                    setTextContent_, copyOptions_, refresh_);
    
  };
  
  
  //Test Methods
  
  it('should create the two buttons.', function() {
    var methodWasCalled = 0;
    
    createADiv_ = function(attributes) {
      methodWasCalled += attributes['class'] === Current_.PagerClass;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should set the text of the buttons', function() {
    var methodWasCalled = 0;
    
    setTextContent_ = function(element, text) {
      methodWasCalled += (element === previousButton_ && text === '<') ||
        (element === nextButton_ && text === '>');
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  
  it('should copy the options for both buttons.', function() {
    var methodWasCalled = 0;
    
    copyOptions_ = function(options, pageNumber) {
      methodWasCalled += options === options_ &&
        (pageNumber === PreviousPage_ || pageNumber === NextPage_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  it('should set the click events.', function() {
    var methodWasCalled = 0;

    refresh_ = function(options){
      methodWasCalled += options === previousOptions_ || options === nextOptions_;
    };
    
    setClick_ = function(element, toDo) {
      toDo();
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should add the buttons to the container', function() {
    var methodWasCalled = 0;
    
    appendChild_ = function(parent, child) {
      methodWasCalled += parent === parentContainer_ &&
        (child === previousButton_ || child === nextButton_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
};


describe('When creating the pager buttons, it', function() {
  
  src.test.control.gridBuilder.whenCreatingThePagerButtons.describe();
  
});
