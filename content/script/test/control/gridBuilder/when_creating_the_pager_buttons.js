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
  var buttonRow_;
  var clearBoth_;
  var copyOptions_;
  var createADiv_;
  var findNode_;
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
    parentContainer_ = {};

    buttonRow_ = {};
    clearBoth_ = {};
    options_ = {};
    nextButton_ = {'id': Current_.NextButton};
    previousButton_ = {'id': Current_.PreviousButton};

    buttonsCreated_ = 0;

    createADiv_ = function(attributes) {
      if (attributes['class'] === Current_.PagerClass) {
        if (buttonsCreated_ === 0) {
          buttonsCreated_ += 1;
          return previousButton_;
        }
        else {
          return nextButton_;
        }
      }
      else {

        if (attributes['class'] === 'clearBoth') {
          return clearBoth_;
        }
        else {
          return buttonRow_;
        }
      }
    };

    nextOptions_ = {'id': 'next'};
    previousOptions_ = {'id': 'previous'};

    copyOptions_ = function(options, pageNumber) {
      return pageNumber === PreviousPage_ ? previousOptions_ : nextOptions_;
    };

    appendChild_ = function() {};
    findNode_ = function() { return null; };
    refresh_ = function(a) {};
    setClick_ = function() {};
    setTextContent_ = function() {};

  });

  //Support Methods

  var callTheMethod_ = function() {
    src.base.control.gridBuilder.createPagerButtons(result_, options_, parentContainer_,
                                                    findNode_, createADiv_, appendChild_,
                                                    setClick_, setTextContent_, copyOptions_,
                                                    refresh_);
  };


  //Test Methods


  it('should create the two buttons.', function() {
    var methodWasCalled = 0;

    createADiv_ = function(attributes) {
      methodWasCalled += attributes['class'] === Current_.PagerClass &&
        (attributes['id'] === Current_.PreviousButton || attributes['id'] === Current_.NextButton);
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

    refresh_ = function(options, grid) {
      methodWasCalled += (options === previousOptions_ || options === nextOptions_) &&
        grid === parentContainer_;
    };

    setClick_ = function(element, toDo) {
      toDo();
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(2);
  });


  it('should create the button row.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        attributes['class'] === Current_.ButtonRowClass;

      return {};
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should add the buttons to the button row.', function() {
    var methodWasCalled = 0;

    appendChild_ = function(parent, child) {
      methodWasCalled += parent === buttonRow_ &&
        (child === previousButton_ || child === nextButton_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(2);
  });


  it('should create the clear div.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {

      methodWasCalled = methodWasCalled ||
        attributes['class'] === 'clearBoth';

      return {};
    };


    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should add the clear div to the button row.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === buttonRow_ && child === clearBoth_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should append the button row.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === parentContainer_ && child === buttonRow_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });



  it('should not create a button if one exists.', function() {
    var methodWasCalled = 0;
    var callCount = 0;

    findNode_ = function() {
      if (callCount === 0) {
        callCount += 1;
        return previousButton_;
      }
      else {
        return nextButton_;
      }
    };

    createADiv_ = function(attributes) {
      methodWasCalled += attributes['class'] === Current_.PagerClass;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(0);
  });


  it('should not append the button if is exists already.', function() {
    var methodWasCalled = false;
    var callCount = 0;

    findNode_ = function() {
      if (callCount === 0) {
        callCount += 1;
        return previousButton_;
      }
      else {
        return nextButton_;
      }
    };

    appendChild_ = function(parent, child) {
      methodWasCalled += parent === buttonRow_ &&
        (child === previousButton_ || child === nextButton_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(0);
  });


};


describe('When creating the pager buttons, it', function() {

  src.test.control.gridBuilder.whenCreatingThePagerButtons.describe();

});
