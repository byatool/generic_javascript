goog.require('goog.string');
goog.require('src.base.control.pager');
goog.provide('src.test.control.pager.whenCreatingAPagerButton');

/**
 @export
 */
src.test.control.pager.whenCreatingAPagerButton.describe = function() {

  //Using
  var Current_ = src.base.control.pager;

  var CurrentPage_ = goog.string.getRandomString();

  //Fields

  var appendChild_;
  var button_;
  var containerRow_;
  var createADiv_;
  var findNode_;
  var isPrevious_;
  var options_;
  var removeAllEvents_;
  var result_;
  var setClick_;
  var setTextContent_;
  var swap_;
  var toggleEnabledOnAButton_;


  //Test Hooks
  beforeEach(function() {
    button_ = {};
    containerRow_ = {};
    isPrevious_ = true;

    options_ = {};
    options_[Current_.Parameters] = {};
    options_[Current_.Parameters][Current_.ParametersPage] = -12;
    options_[Current_.Parameters][Current_.ResultTotalCountOfPages] = -21;
    options_[Current_.CopyOptions] = function() { return {}; };

    result_ = {};
    result_[Current_.ResultTotalCountOfPages] = 1212;

    appendChild_ = function() {};
    createADiv_ = function() { return button_; };
    findNode_ = function() {return null; };
    removeAllEvents_ = function() {};
    setClick_ = function() {};
    setTextContent_ = function() {};
    swap_ = function() {};
    toggleEnabledOnAButton_ = function() {};
  });


  //Support Methods
  var callTheMethod_ = function() {
    src.base.control.pager.createAndAppendPagerButton(isPrevious_, options_, result_,
                                                      containerRow_, findNode_, createADiv_,
                                                      setTextContent_, toggleEnabledOnAButton_,
                                                      removeAllEvents_, swap_, setClick_,
                                                      appendChild_);
  };


  //Test Methods

  it('should attempt to find the previous pager button.', function() {
    var methodWasCalled = false;

    findNode_ = function(containerRow, toDo) {
      methodWasCalled = methodWasCalled ||
        (containerRow === containerRow_ &&
         toDo({'id': Current_.PreviousButton}));
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });
  

  it('should attempt to find the next pager button.', function() {
    var methodWasCalled = false;

    isPrevious_ = false;

    findNode_ = function(containerRow, toDo) {
      methodWasCalled = methodWasCalled ||
        (containerRow === containerRow_ &&
         toDo({'id': Current_.NextButton}));
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the previous button if it does not exist.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes['id'] === Current_.PreviousButton &&
         attributes['class'] === Current_.PagerClass);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the next button if it does not exist.', function() {
    var methodWasCalled = false;

    isPrevious_ = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes['id'] === Current_.NextButton &&
         attributes['class'] === Current_.PagerClass);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should not create a button if it exists.', function() {
    var methodWasCalled = false;

    findNode_ = function() {
      return button_;
    };

    createADiv_ = function() {
      methodWasCalled = true;
    };
    
    callTheMethod_();

    expect(methodWasCalled).toBe(methodWasCalled);
  });


  it('should set the text of the previous button.', function() {
    var methodWasCalled = false;

    setTextContent_ = function(element, text) {
      methodWasCalled = methodWasCalled ||
        (element === button_ && text === '<');
    };


    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the text of the next button.', function() {
    var methodWasCalled = false;
    isPrevious_ = false;

    setTextContent_ = function(element, text) {
      methodWasCalled = methodWasCalled ||
        (element === button_ && text === '>');
    };


    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should append the button to the containerRow.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === containerRow_ && child === button_);
    };


    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should copy the options for the previous page.', function() {
    var methodWasCalled = false;
    var optionValue = {};

    result_[Current_.ResultPreviousPage] = optionValue;

    options_[Current_.CopyOptions] = function(options, resultKey) {
      methodWasCalled = methodWasCalled ||
        (options === options_ && resultKey === optionValue);
    };
    
    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should copy the options for the next page.', function() {
    var methodWasCalled = false;
    var optionValue = {};

    isPrevious_ = false;
    result_[Current_.ResultNextPage] = optionValue;

    options_[Current_.CopyOptions] = function(options, resultKey) {
      methodWasCalled = methodWasCalled ||
        (options === options_ && resultKey === optionValue);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should toggle enabled on the button.', function() {
    var methodWasCalled = false;
    toggleEnabledOnAButton_ = function(button, isPrevious, pageNumber,
                                       totalCountOfPages, swap) {
      methodWasCalled = methodWasCalled ||
        (button === button_ &&
         isPrevious === isPrevious_ &&
         pageNumber === options_[Current_.Parameters][Current_.ParametersPage] &&
         totalCountOfPages === result_[Current_.TotalCountOfPages] &&
         swap === swap_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should remove the events from the button.', function() {
    var methodWasCalled = false;

    removeAllEvents_ = function(button) {
      methodWasCalled = button === button_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the click event.', function() {
    var methodWasCalled = false;
    var copiedOptions = {};

    options_[Current_.CopyOptions] = function() {
      return copiedOptions;
    };

    options_[Current_.Refresh] = function(options) {
      methodWasCalled = methodWasCalled &&
        options === copiedOptions;
    };

    setClick_ = function(button, toDo) {
      methodWasCalled = button === button_;
      toDo();
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

};


describe('When creating a pager button, it', function() {
  src.test.control.pager.whenCreatingAPagerButton.describe();
});
